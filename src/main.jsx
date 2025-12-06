// src/main.jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import { initCSRF } from "./services/api";  // ← import here

// This runs ONCE and waits for CSRF cookie before anything else
function AppInitializer() {
  useEffect(() => {
    initCSRF().then(() => {
      console.log("CSRF ready — safe to make requests");
    });
  }, []);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppInitializer />    {/* ← This fixes everything */}
        <App />
        <Toaster position="top-center" />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);