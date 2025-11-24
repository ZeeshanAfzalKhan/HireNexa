import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../redux/hooks/useAuth";
import { useProfile } from "../redux/hooks/useProfile";
import {
  BarChart3,
  User,
  FileText,
  Settings,
  Briefcase,
  Building2,
  PlusCircle,
  Home,
  LogIn,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, isAuthenticated, getCurrentUser } = useAuth();
  const { profile, getProfile } = useProfile();

  // fetch user/profile safely
  useEffect(() => {
    if (isAuthenticated && !user) getCurrentUser();
  }, [isAuthenticated, user, getCurrentUser]);

  useEffect(() => {
    if (isAuthenticated && !profile) getProfile();
  }, [isAuthenticated, profile, getProfile]);

  // keep a CSS var that other layouts can reference (optional)
  useEffect(() => {
    // sidebar width var (used by page content)
    const width = isCollapsed ? "5rem" : "16rem";
    document.documentElement.style.setProperty("--sidebar-width", width);
  }, [isCollapsed]);

  const role = user?.role;
  const displayName = (profile?.firstName || user?.firstName || "User") + (profile?.lastName || user?.lastName ? ` ${profile?.lastName || user?.lastName}` : "");
  const displayEmail = profile?.emailId || user?.emailId || "";
  const avatarUrl = profile?.profile?.profilePicture?.profilePictureURL;

  const sidebarItems = (() => {
    if (role === "student")
      return [
        { name: "Dashboard", path: "/candidate-dashboard", icon: BarChart3 },
        { name: "Profile", path: "/candidate-profile", icon: User },
        { name: "My Applications", path: "/my-applications", icon: FileText },
        { name: "Settings", path: "/settings", icon: Settings },
      ];
    if (role === "recruitor")
      return [
        { name: "Dashboard", path: "/recruitor-dashboard", icon: BarChart3 },
        { name: "Company Profile", path: "/company-profile", icon: Building2 },
        { name: "Post Job", path: "/post-job", icon: PlusCircle },
        { name: "My Jobs", path: "/my-posted-jobs", icon: Briefcase },
        { name: "Settings", path: "/settings", icon: Settings },
      ];
    return [
      { name: "Home", path: "/", icon: Home },
      { name: "Login", path: "/login/student", icon: LogIn },
    ];
  })();

  return (
    <>
      {/* Desktop sidebar: visible on md+ */}
      <aside
        className={`hidden md:flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xl border border-gray-200 dark:border-gray-700 rounded-r-2xl transition-all duration-200 ${
          isCollapsed ? "w-20" : "w-64"
        } fixed left-0 top-[var(--navbar-height,4rem)] bottom-0 z-[2000]`}
        aria-label="Sidebar"
      >
        {/* top toggle */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <button
            onClick={() => setIsCollapsed((s) => !s)}
            className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-[#34aeeb]" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-[#34aeeb]" />
            )}
          </button>
        </div>

        {/* nav - scrollable */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center rounded-xl transition-colors duration-150 ${
                  isCollapsed ? "p-2 justify-center" : "p-3"
                } ${isActive ? "bg-[#34aeeb] text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#34aeeb]"}`}
            >
              <item.icon className={isCollapsed ? "w-6 h-6" : "w-5 h-5"} />
              {!isCollapsed && <span className="ml-3 font-medium">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* user area - always in flow (not absolute) */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-3"}`}>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className={isCollapsed ? "w-10 h-10 rounded-full object-cover" : "w-8 h-8 rounded-full object-cover"}
              />
            ) : (
              <div className={`${isCollapsed ? "w-10 h-10 text-lg" : "w-8 h-8 text-sm"} bg-[#34aeeb] rounded-full flex items-center justify-center`}>
                <span className="text-white font-bold">{(displayName || "U").charAt(0).toUpperCase()}</span>
              </div>
            )}
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium truncate max-w-[10rem]">{displayName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[10rem]">{displayEmail}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile floating button / drawer (keeps original mobile behavior) */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed bottom-6 right-6 bg-[#34aeeb] text-white p-4 rounded-full shadow-lg hover:bg-[#2a8bc7] transition-colors cursor-pointer z-[2000]"
        aria-label="Open Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isMobileOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[2000]" onClick={() => setIsMobileOpen(false)} />
          <div className="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white z-[2001] shadow-xl border-r border-gray-200 dark:border-gray-700">
            {/* mobile header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="font-semibold">Menu</span>
              <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-2">
              {sidebarItems.map((item) => (
                <NavLink key={item.name} to={item.path} onClick={() => setIsMobileOpen(false)} className={({ isActive }) => `flex items-center p-3 rounded-xl ${isActive ? "bg-[#34aeeb] text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#34aeeb]"}`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              ))}
            </div>

            {/* mobile user */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                {avatarUrl ? <img src={avatarUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 bg-[#34aeeb] rounded-full flex items-center justify-center"><span className="text-white text-sm font-bold">{(displayName || "U").charAt(0).toUpperCase()}</span></div>}
                <div>
                  <p className="text-sm font-medium truncate max-w-[11rem]">{displayName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[11rem]">{displayEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
