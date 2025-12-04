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

// CSRF cookie defaults
api.defaults.xsrfCookieName = "csrftoken";
api.defaults.xsrfHeaderName = "X-CSRFToken";

// Fetch CSRF cookie
export async function initCSRF() {
  try {
    await api.get("users/get-csrf/");
  } catch (err) {
    console.warn("CSRF refresh failed", err);
  }
}

// 🔥 AUTO-CSRF INTERCEPTOR (THE REAL FIX)
api.interceptors.request.use(async (config) => {
  const method = config.method?.toUpperCase();

  // Only refresh CSRF for unsafe methods
  const needsCSRF = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  if (needsCSRF) {
    await initCSRF();  // Always refresh before modifying data
  }

  return config;
});

export default api;
