import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const ProtectedAppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 with-sidebar-md">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedAppLayout;