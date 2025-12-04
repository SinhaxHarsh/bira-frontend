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

// CSRF Cookie names
api.defaults.xsrfCookieName = "csrftoken";
api.defaults.xsrfHeaderName = "X-CSRFToken";

// Attach CSRF token on every request
api.interceptors.request.use((config) => {
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];

  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }

  return config;
});

// Fetch CSRF token on app start
export async function initCSRF() {
  try {
    await api.get("users/get-csrf/");
  } catch (err) {
    console.error("CSRF load failed", err);
  }
}

export default api;
