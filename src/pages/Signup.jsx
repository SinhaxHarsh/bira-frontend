import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { registerUser } from "../services/authServices";

export default function Signup() {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ⭐ ENTER → focus next field
  const handleEnterKey = (e, nextFieldId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const next = document.getElementById(nextFieldId);
      if (next) next.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Username || !formData.Email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await registerUser(formData);
      toast.success(res.message || "Signup successful!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);

      setFormData({
        Username: "",
        Email: "",
        password: "",
      });

    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.error ||
        "Signup failed";

      toast.error(msg);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">

          {/* Username */}
          <input
            id="username"
            type="text"
            name="Username"
            placeholder="Username"
            value={formData.Username}
            onChange={handleChange}
            onKeyDown={(e) => handleEnterKey(e, "email")}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          />

          {/* Email */}
          <input
            id="email"
            type="email"
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            onKeyDown={(e) => handleEnterKey(e, "password")}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          />

          {/* Password */}
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold">
            Login
          </a>
        </p>

      </motion.div>
    </div>
  );
}
