import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { initCSRF } from "./services/api";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutApp from "./pages/AboutApp";

export default function App() {
  useEffect(() => {
    // Run CSRF initialization safely
    const loadCSRF = async () => {
      await initCSRF();
    };
    loadCSRF();
  }, []);

  return (
    <MainLayout>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about-app" element={<AboutApp />} />

        {/* PROTECTED ROUTE */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </MainLayout>
  );
}
