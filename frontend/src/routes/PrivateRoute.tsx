import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  // Wait until auth check finishes
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Checking authentication...</p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
