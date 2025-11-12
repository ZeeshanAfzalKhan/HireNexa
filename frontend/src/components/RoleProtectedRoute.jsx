import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  // select primitives / stable refs separately
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const location = useLocation();

  // Avoid redirect flicker while auth state is being resolved
  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to a role-specific login if unauthenticated
    const targetLogin = allowedRoles.includes("recruitor")
      ? "/login/recruitor"
      : "/login/student";
    return (
      <Navigate
        to={targetLogin}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  const role = user?.role;
  const isAllowed = allowedRoles.length === 0 || (role && allowedRoles.includes(role));

  if (!isAllowed) {
    // Redirect to a dedicated 403 page
    return (
      <Navigate
        to="/forbidden"
        replace
        state={{ from: location.pathname, reason: "unauthorized" }}
      />
    );
  }

  return children;
};

export default RoleProtectedRoute;
