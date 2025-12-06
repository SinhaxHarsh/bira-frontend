// src/main.jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import { initCSRF } from "./services/api"; // ← import here

// Tiny component that runs CSRF init exactly once on app mount
function CSRFInitializer() {
  useEffect(() => {
    initCSRF().catch((err) => {
      console.warn("Failed to initialize CSRF token (non-blocking)", err);
    });
  }, []);

  return null; // renders nothing
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CSRFInitializer />        {/* ← This guarantees CSRF cookie is set early */}
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);