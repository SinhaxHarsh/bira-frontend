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


export default api;
