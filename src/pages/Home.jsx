// src/pages/Home.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // ------------------------------
  // "Get Started" behaviour:
  //  - if logged in  → /about-app
  //  - if logged out → /signup
  // ------------------------------
  const handleGetStarted = () => {
    if (loading) return; // optional: ignore clicks while checking auth

    if (isAuthenticated) {
      navigate("/about-app");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="flex flex-col items-center text-center px-4 py-20">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Manage Your Tasks Effortlessly
      </motion.h1>

      <motion.p
        className="text-gray-600 max-w-2xl mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.08 }}
      >
        A clean and fast task management tool built with React, Tailwind, and Django.
      </motion.p>

      <motion.div
        className="mt-8 flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
      >
        {/* View Tasks – ProtectedRoute will send unauth users to /login */}
        <button
          onClick={() => navigate("/tasks")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
        >
          View Tasks
        </button>

        {/* Get Started – now uses auth state instead of localStorage */}
        <button
          onClick={handleGetStarted}
          disabled={loading}
          className="bg-white border border-gray-200 px-6 py-3 rounded-lg shadow hover:bg-gray-50 disabled:opacity-60"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
}
