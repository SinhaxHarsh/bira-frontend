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

// GET CSRF TOKEN FROM COOKIE — BULLETPROOF
const getCsrfToken = () => {
  const name = "csrftoken";
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) return decodeURIComponent(value);
  }
  return null;
};

// FETCH CSRF COOKIE ONCE
export const initCSRF = async () => {
  try {
    await api.get("users/get-csrf/");
    console.log("CSRF cookie set");
  } catch (err) {
    console.warn("CSRF init failed", err);
  }
};

// INTERCEPTOR — FORCE X-CSRFToken HEADER ON EVERY POST/PATCH/DELETE
api.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();
  if (["post", "patch", "put", "delete"].includes(method)) {
    const token = getCsrfToken();
    if (token) {
      config.headers["X-CSRFToken"] = token;
      console.log("X-CSRFToken header added");
    } else {
      console.error("CSRF token not found in cookie!");
    }
  }
  return config;
});

export default api;