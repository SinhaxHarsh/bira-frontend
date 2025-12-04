// src/services/api.js
import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "https://graceful-embrace-production.up.railway.app/api/";

const api = axios.create({
  baseURL: BASE,
  withCredentials: true,  // This is crucial for sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Remove the xsrf defaults and interceptor - let axios handle it automatically
api.defaults.xsrfCookieName = "csrftoken";
api.defaults.xsrfHeaderName = "X-CSRFToken";

// Fetch CSRF token on app start
export async function initCSRF() {
  try {
    // Make sure this endpoint exists in your Django backend
    await api.get("users/get-csrf/");
  } catch (err) {
    console.error("CSRF load failed", err);
  }
}

export default api;