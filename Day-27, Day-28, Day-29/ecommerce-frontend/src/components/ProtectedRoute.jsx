import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true;

  if (isAuthenticated) {
    return children;
  } else {
    console.log();
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
