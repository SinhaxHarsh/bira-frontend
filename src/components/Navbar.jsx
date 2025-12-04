import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="bg-white border-b sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LOGO */}
        <NavLink to="/" className="text-2xl font-extrabold text-blue-600">
          Bira
        </NavLink>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">

          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink to="/tasks">Tasks</NavLink>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="#374151"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* ===== MOBILE DROPDOWN MENU ===== */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 mt-2 border-t pt-3 bg-white shadow-inner">

          {!user && (
            <>
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="py-1"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                onClick={() => setOpen(false)}
                className="py-1"
              >
                Signup
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink
                to="/tasks"
                onClick={() => setOpen(false)}
                className="py-1"
              >
                Tasks
              </NavLink>

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="text-red-500 text-left py-1"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </motion.nav>
  );
}
