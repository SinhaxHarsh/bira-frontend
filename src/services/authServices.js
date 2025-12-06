import api from "./api";

// REGISTER
export async function registerUser(data) {
  return api.post("users/register/", data).then((res) => res.data);
}

// LOGIN
export async function loginUser(data) {
  return api.post("users/login/", data).then((res) => res.data);
}

// LOGOUT
export async function logoutUser() {
  const refresh = localStorage.getItem("refresh");

  return api.post("users/logout/", { refresh }).then((res) => res.data);
}

// CHECK AUTH
export async function checkAuth() {
  return api
    .get("users/check-auth/")
    .then((res) => res.data)
    .catch(() => ({ isAuthenticated: false }));
}
