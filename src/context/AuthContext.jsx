import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser, checkAuth } from "../services/authServices";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore login session if token exists
  const restoreSession = async () => {
    const access = localStorage.getItem("access");

    if (!access) {
      setUser(null);
      return;
    }

    const data = await checkAuth();

    if (data.isAuthenticated) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    restoreSession().finally(() => setLoading(false));
  }, []);

  // LOGIN
  const login = async ({ email, password }) => {
    try {
      const res = await loginUser({ email, password });

      localStorage.setItem("access", res.tokens.access);
      localStorage.setItem("refresh", res.tokens.refresh);

      setUser(res.user);

      toast.success("Login successful");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Login failed");
      throw error;
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await logoutUser();
    } catch (e) {}

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
