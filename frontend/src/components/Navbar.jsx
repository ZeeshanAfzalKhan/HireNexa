import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../redux/hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, getCurrentUser } = useAuth();

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Public (marketing) links
  const publicNav = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Shared links visible when authenticated
  const commonNav = [{ name: "Jobs", path: "/jobs" }];

  // Student links
  const studentNav = [
    { name: "Profile", path: "/candidate-profile" },
    { name: "Dashboard", path: "/candidate-dashboard" },
    { name: "Applications", path: "/my-applications" },
    { name: "Settings", path: "/settings" },
  ];

  // Recruiter links
  const recruiterNav = [
    { name: "Company", path: "/company-profile" },
    { name: "Dashboard", path: "/recruitor-dashboard" },
    { name: "Post Job", path: "/post-job" },
    { name: "Applications", path: "/applications-for-job" },
    { name: "Settings", path: "/settings" },
  ];

  const activeNav = !isAuthenticated
    ? publicNav
    : user?.role === "student"
    ? [...commonNav, ...studentNav]
    : user?.role === "recruitor"
    ? recruiterNav
    : [];

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#34aeeb] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold">HireNexa</span>
            </Link>
          </div>


          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {activeNav.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive ? "text-[#34aeeb]" : "text-gray-300 hover:text-[#34aeeb]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              {!isAuthenticated ? (
                <>
                  <NavLink
                    to="/login/student"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-[#34aeeb] font-semibold"
                          : "text-gray-300 hover:text-[#34aeeb]"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup/student"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "bg-[#256b97] text-white"
                          : "bg-[#34aeeb] hover:bg-[#2a8bc7] text-white"
                      }`
                    }
                  >
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <>
                  <button
                    onClick={async () => {
                      await logout();
                      navigate("/");
                    }}
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-300 hover:text-[#34aeeb] cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-[#34aeeb] p-2 rounded-md cursor-pointer"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-700">
              {(isAuthenticated ? activeNav : publicNav).map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-300 hover:text-[#34aeeb] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex flex-col space-y-2">
                  {!isAuthenticated ? (
                    <>
                      <button
                        onClick={() => {
                          navigate("/login/student");
                          setIsMenuOpen(false);
                        }}
                        className="text-gray-300 hover:text-[#34aeeb] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-left cursor-pointer"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          navigate("/signup/student");
                          setIsMenuOpen(false);
                        }}
                        className="bg-[#34aeeb] hover:bg-[#2a8bc7] text-white px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 text-left cursor-pointer"
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Authenticated users see nav items above; only show Logout here */}
                      <button
                        onClick={async () => {
                          await logout();
                          setIsMenuOpen(false);
                          navigate("/");
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 text-left cursor-pointer"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
