import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  }));
  const location = useLocation();

  if (isAuthenticated) {
    const role = user?.role;
    const redirectPath = role === "recruitor" ? "/recruitor-dashboard" : role === "student" ? "/candidate-dashboard" : "/";
    return <Navigate to={redirectPath} replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default PublicOnlyRoute;