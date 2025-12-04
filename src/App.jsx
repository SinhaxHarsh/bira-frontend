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
    initCSRF();  // Fetch CSRF cookie on app start
  }, []);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-app" element={<AboutApp />} />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </MainLayout>
  );
}
