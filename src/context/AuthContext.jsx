// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api, { initCSRF } from "../services/api";
import { loginUser, logoutUser, checkAuth } from "../services/authServices";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // Restore session from Django
  // ------------------------------
  const restoreSession = async () => {
    try {
      const data = await checkAuth();
      if (data.isAuthenticated) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
  };

  // ------------------------------
  // On app start
  // ------------------------------
  useEffect(() => {
    (async () => {
      try {
        await initCSRF(); // Ensure csrftoken exists
      } catch (err) {
        console.error("CSRF init failed", err);
      }
      await restoreSession();
      setLoading(false);
    })();
  }, []);

  // ------------------------------
  // LOGIN — accepts { email, password }
  // ------------------------------
  const login = async ({ email, password }) => {
  try {
    await initCSRF();
    await loginUser({ email, password });
    await restoreSession();
    toast.success("Login successful");
  } catch (err) {
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.detail ||
      "Login failed";
    toast.error(msg);
    throw err;
  }
};

  // ------------------------------
  // LOGOUT
  // ------------------------------
  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        refreshUser: restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
