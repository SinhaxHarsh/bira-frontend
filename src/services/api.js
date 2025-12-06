// src/services/api.js
import axios from "axios";

const BASE = import.meta.env.VITE_API_URL + "/api/";

const api = axios.create({
  baseURL: BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export const initCSRF = async () => {
  try {
    await api.get("users/get-csrf/");
    console.log("CSRF cookie set — token ready");
  } catch (err) {
    console.warn("CSRF init failed", err);
  }
};

// THIS IS THE FIX — force lowercase method check + always add header
api.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();
  if (["post", "put", "patch", "delete"].includes(method)) {
    const token = getCookie("csrftoken");
    if (token) {
      config.headers["X-CSRFToken"] = token;
      console.log("X-CSRFToken header added:", token.substring(0, 10) + "...");
    } else {
      console.error("CSRF token missing from cookie!");
    }
  }
  return config;
});

export default api;