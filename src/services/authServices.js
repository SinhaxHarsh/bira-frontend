// src/services/authServices.js
import api from "./api";

// REGISTER
export async function registerUser(data) {
  return api
    .post("users/register/", data)
    .then((res) => res.data)
    .catch((err) => {
      throw err.response?.data || { error: "Something went wrong" };
    });
}

// LOGIN
export async function loginUser(data) {
  return api
    .post("users/login/", data)
    .then((res) => res.data)
    .catch((err) => {
      throw err.response?.data || { error: "Something went wrong" };
    });
}

// LOGOUT
export async function logoutUser() {
  return api
    .post("users/log-out/", {})   // 👈 REQUIRED so cookies get sent
    .then((res) => res.data)
    .catch((err) => {
      throw err.response?.data || { error: "Something went wrong" };
    });
}
// CHECK AUTH
export async function checkAuth() {
  return api
    .get("users/check-auth/")
    .then((res) => res.data)
    .catch((err) => {
      return { isAuthenticated: false };
    });
}