import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData); // AuthContext shows toast
      navigate("/tasks");
    } catch (err) {
      // Do NOT show toast here — AuthContext already handled it
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[75vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <p className="text-gray-600 text-center mt-1">
          Access your account to manage tasks
        </p>

        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-blue-600 font-medium">
            Signup
          </NavLink>
        </p>
      </motion.div>
    </div>
  );
}
