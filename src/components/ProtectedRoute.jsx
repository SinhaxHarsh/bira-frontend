import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center mt-20">Checking session...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
