import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../redux/hooks/useAuth";
import { useProfile } from "../redux/hooks/useProfile";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, isAuthenticated, getCurrentUser } = useAuth();
  const { profile, getProfile } = useProfile();

  useEffect(() => {
    if (isAuthenticated && !user) {
      getCurrentUser();
    }
  }, [isAuthenticated, user, getCurrentUser]);

  useEffect(() => {
    if (isAuthenticated && !profile) {
      getProfile();
    }
  }, [isAuthenticated, profile, getProfile]);

  // Sync content margin with Sidebar width on md+ via CSS variable
  useEffect(() => {
    const width = isCollapsed ? "4rem" : "16rem";
    document.documentElement.style.setProperty("--sidebar-width", width);
  }, [isCollapsed]);

  const role = user?.role;

  const displayName = (() => {
    const fn = profile?.firstName || user?.firstName;
    const ln = profile?.lastName || user?.lastName;
    const name = [fn, ln].filter(Boolean).join(" ");
    return name || "User";
  })();

  const displayEmail = profile?.emailId || user?.emailId || "";
  const avatarUrl = profile?.profile?.profilePicture?.profilePictureURL;

  const sidebarItems = (() => {
    // Student (candidate) routes
    if (role === "student") {
      return [
        { name: "Dashboard", path: "/candidate-dashboard", icon: "📊" },
        { name: "Profile", path: "/candidate-profile", icon: "👤" },
        { name: "My Applications", path: "/my-applications", icon: "📋" },
        { name: "Settings", path: "/settings", icon: "⚙️" },
      ];
    }
    // Recruiter routes
    if (role === "recruitor") {
      return [
        { name: "Dashboard", path: "/recruitor-dashboard", icon: "📊" },
        { name: "Company Profile", path: "/company-profile", icon: "👤" },
        { name: "Post Job", path: "/post-job", icon: "📝" },
        { name: "Applications", path: "/applications-for-job", icon: "📋" },
        { name: "Settings", path: "/settings", icon: "⚙️" },
      ];
    }
    // Fallback: generic links
    return [
      { name: "Home", path: "/", icon: "🏠" },
      { name: "Login", path: "/login/student", icon: "🔐" },
    ];
  })();

  return (<>
    <div
      className={`hidden md:block bg-gray-900 text-white shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } min-h-screen fixed left-0 top-16 z-40`}
    >
      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
        >
          <span className="text-[#34aeeb] text-2xl">{isCollapsed ? "»" : "«"}</span>
        </button>
      </div>

      {/* Navigation Items */}
      <div className="p-4 space-y-2">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center rounded-lg transition-colors duration-200 ${isCollapsed ? "p-2 justify-center" : "p-3"} ${
                isActive
                  ? "bg-[#34aeeb] text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-[#34aeeb]"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && (
              <span className="ml-3 font-medium">{item.name}</span>
            )}
          </NavLink>
        ))}
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-[#34aeeb] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {(displayName || "U").charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <p className="text-sm font-medium">{displayName}</p>
              <p className="text-xs text-gray-400">{displayEmail}</p>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Mobile toggle button (floating) */}
    <button
      onClick={() => setIsMobileOpen(true)}
      className="md:hidden fixed bottom-6 right-6 bg-[#34aeeb] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#2a8bc7] transition-colors cursor-pointer z-40"
      aria-label="Open Menu"
    >
      Menu
    </button>

    {/* Mobile Drawer */}
    {isMobileOpen && (
      <>
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
        <div className="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white z-50 shadow-lg">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <span className="font-semibold">Menu</span>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
              aria-label="Close Menu"
            >
              ✕
            </button>
          </div>
          <div className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-[#34aeeb] text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-[#34aeeb]"
                  }`
                }
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </>
    )}
  </>);
};

export default Sidebar;