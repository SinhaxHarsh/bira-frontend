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

// Tell Axios which cookie/header to use for CSRF
api.defaults.xsrfCookieName = "csrftoken";
api.defaults.xsrfHeaderName = "X-CSRFToken";

// Helper: manually read csrftoken from document.cookie (works even cross-origin)
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

// Fetch CSRF cookie from backend (must be called at least once)
export const initCSRF = async () => {
  try {
    await api.get("users/get-csrf/");
    console.log("CSRF cookie fetched & set by Django");
  } catch (err) {
    console.warn("Failed to fetch CSRF cookie (non-blocking)", err);
  }
};

// Interceptor: force X-CSRFToken header on every unsafe request
api.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase();
  const unsafeMethods = ["POST", "PUT", "PATCH", "DELETE"];

  if (unsafeMethods.includes(method)) {
    const token = getCookie("csrftoken");
    if (token) {
      config.headers["X-CSRFToken"] = token;
      // Optional debug (remove later if you want)
      console.log("X-CSRFToken header added:", token);
    } else {
      console.warn("CSRF token cookie not found! Request may 403.");
    }
  }

  return config;
});

export default api;