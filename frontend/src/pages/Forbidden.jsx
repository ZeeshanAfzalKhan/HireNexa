import React from "react";
import { Link, useLocation } from "react-router-dom";

const Forbidden = () => {
  const location = useLocation();
  const from = location.state?.from;
  const reason = location.state?.reason || "unauthorized";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-bold mb-4">403 – Forbidden</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          You don't have permission to access this page.
        </p>
        {from && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Tried to access: <span className="font-mono">{from}</span>
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            state={{ reason }}
          >
            Go Home
          </Link>
          <Link
            to="/login/student"
            className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            Login with correct account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;