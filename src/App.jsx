import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutApp from "./pages/AboutApp";

export default function App() {
  return (
    <MainLayout>
      <Routes>

        <Route path="/" element={<Home />} />

        {/* ABOUT PAGE (Public) */}
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

        {/* PUBLIC PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </MainLayout>
  );
}
