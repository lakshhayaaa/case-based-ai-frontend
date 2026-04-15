import { useAuth } from "../lib/auth-context"; // adjust path if needed
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const { user, isLoading } = useAuth();

  // ⏳ wait until auth state is loaded
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // ❌ not logged in → redirect
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ✅ logged in → allow access
  return children;
}