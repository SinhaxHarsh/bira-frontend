// src/services/api.js
import axios from "axios";

const BASE = import.meta.env.VITE_API_URL + "/api/";

const api = axios.create({
  baseURL: BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// CSRF defaults
api.defaults.xsrfCookieName = "csrftoken";
api.defaults.xsrfHeaderName = "X-CSRFToken";


// ------------------------------
// FETCH CSRF TOKEN
// ------------------------------
export async function initCSRF() {
  try {
    await api.get("users/get-csrf/");
  } catch (err) {
    console.warn("CSRF init failed", err);
  }
}


// ------------------------------
// AUTO-CSRF FOR MUTATING REQUESTS
// ------------------------------
api.interceptors.request.use(async (config) => {
  const method = config.method?.toUpperCase();
  const unsafe = ["POST", "PUT", "PATCH", "DELETE"];

  // Only refresh CSRF for unsafe methods
  if (unsafe.includes(method)) {
    await initCSRF();
  }

  return config;
});

export default api;
