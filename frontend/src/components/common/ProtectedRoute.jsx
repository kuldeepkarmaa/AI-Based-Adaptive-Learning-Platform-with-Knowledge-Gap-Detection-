import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "./Loader";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user)   return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
    const redirect = user.role === "Student" ? "/student/dashboard"
                   : user.role === "Teacher" ? "/teacher/dashboard"
                   : "/admin/dashboard";
    return <Navigate to={redirect} replace />;
  }
  return children;
}