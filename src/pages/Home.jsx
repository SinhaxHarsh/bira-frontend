// src/pages/Home.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMemo } from "react";

export default function Home() {
  const { isAuthenticated, loading, user } = useAuth();
  const navigate = useNavigate();

  // ------------------------------
  // Generate dynamic greeting
  // ------------------------------
  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 16) return "Good Afternoon";
    return "Good Evening";
  }, []);

  const handleGetStarted = () => {
    if (loading) return;

    if (isAuthenticated) {
      navigate("/about-app");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="flex flex-col items-center text-center px-4 py-20">

      {/* ========================== */}
      {/* Dynamic Greeting (NEW) */}
      {/* ========================== */}
      <motion.h2
        className="text-xl md:text-2xl font-semibold text-gray-700 mb-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {greeting}
        {isAuthenticated && user?.username ? `, ${user.username}!` : "!"}
      </motion.h2>

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
        <button
          onClick={() => navigate("/tasks")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
        >
          View Tasks
        </button>

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
