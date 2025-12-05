// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser, checkAuth } from "../services/authServices";
import { initCSRF } from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from backend
  const restoreSession = async () => {
    const data = await checkAuth();
    if (data.isAuthenticated) setUser(data.user);
    else setUser(null);
  };

  // Run once on app load
  useEffect(() => {
    (async () => {
      await initCSRF();        // ensures csrftoken exists
      await restoreSession();  // ensures session restored if user logged in
      setLoading(false);
    })();
  }, []);

  // LOGIN
  const login = async ({ email, password }) => {
    try {
      await initCSRF(); // fresh CSRF before login
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

  // LOGOUT
  const logout = async () => {
    await logoutUser();
    setUser(null);
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
