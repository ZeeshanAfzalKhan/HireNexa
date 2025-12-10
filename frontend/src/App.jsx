import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginStudent from "./pages/LoginStudent";
import LoginRecruitor from "./pages/LoginRecruitor";
import SignupStudent from "./pages/SignupStudent";
import SignupRecruitor from "./pages/SignupRecruitor";
import CandidateDashboard from "./pages/Dashboard/CandidateDashboard";
import RecruiterDashboard from "./pages/Dashboard/RecruiterDashboard";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FeaturesPage from "./pages/FeaturesPage";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import CandidateProfile from "./pages/Profile/CandidateProfile";
import CompanyProfile from "./pages/Profile/CompanyProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import PostJob from "./pages/PostJob";
import Settings from "./pages/Settings";
import Error404 from "./pages/Error404";
import Forbidden from "./pages/Forbidden";
import MyApplications from "./pages/applications/MyApplications";
import ApplicationsForJob from "./pages/applications/ApplicationsForJob";
import ApplyJob from "./pages/applications/ApplyJob";
import MyPostedJobs from "./pages/MyPostedJobs";
import UpdateJob from "./pages/UpdateJob";
import OAuthCallbackPage from "./pages/OAuthCallbackPage.jsx";
import ProtectedAppLayout from "./components/ProtectedAppLayout";

import { Toaster } from "react-hot-toast";
import { useToastNotifications } from "./hooks/useToastNotifications";
import { useAuth } from "./redux/hooks/useAuth.js";

const TOASTER_CONFIG = {
  position: "top-right",
  toastOptions: {
    duration: 3000,
    style: {
      background: '#363636',
      color: '#fff',
      borderRadius: '10px',
      padding: '16px',
    },
    success: {
      duration: 3000,
      iconTheme: {
        primary: '#10b981',
        secondary: '#fff',
      },
    },
    error: {
      duration: 4000,
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    },
  },
};

// Layout component that includes the navbar
const Layout = () => {
  const { getCurrentUser } = useAuth();
  useToastNotifications();

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-200 flex flex-col">
      <Toaster {...TOASTER_CONFIG} />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PublicOnlyRoute>
            <HomePage />
          </PublicOnlyRoute>
        ),
      },

      {
        path: "login/student",
        element: (
          <PublicOnlyRoute>
            <LoginStudent />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "login/recruitor",
        element: (
          <PublicOnlyRoute>
            <LoginRecruitor />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "signup/student",
        element: (
          <PublicOnlyRoute>
            <SignupStudent />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "signup/recruitor",
        element: (
          <PublicOnlyRoute>
            <SignupRecruitor />
          </PublicOnlyRoute>
        ),
      },
      {
        element: (
          <ProtectedRoute>
            <ProtectedAppLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "candidate-dashboard",
            element: (
              <RoleProtectedRoute allowedRoles={["student"]}>
                <CandidateDashboard />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "recruitor-dashboard",
            element: (
              <RoleProtectedRoute allowedRoles={["recruitor"]}>
                <RecruiterDashboard />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "candidate-profile",
            element: (
              <RoleProtectedRoute allowedRoles={["student"]}>
                <CandidateProfile />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "company-profile",
            element: (
              <RoleProtectedRoute allowedRoles={["recruitor"]}>
                <CompanyProfile />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "post-job",
            element: (
              <RoleProtectedRoute allowedRoles={["recruitor"]}>
                <PostJob />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "my-applications",
            element: (
              <RoleProtectedRoute allowedRoles={["student"]}>
                <MyApplications />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "apply/:jobId",
            element: (
              <RoleProtectedRoute allowedRoles={["student"]}>
                <ApplyJob />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "my-posted-jobs",
            element: (
              <RoleProtectedRoute allowedRoles={["recruitor"]}>
                <MyPostedJobs />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "applications/:jobId",
            element: (
              <RoleProtectedRoute allowedRoles={["recruitor"]}>
                <ApplicationsForJob />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "update-job/:id",
            element: (
              <RoleProtectedRoute allowedRoles={["recruitor"]}>
                <UpdateJob />
              </RoleProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "about",
        element: (
          <PublicOnlyRoute>
            <AboutPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <PublicOnlyRoute>
            <ContactPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "features",
        element: (
          <PublicOnlyRoute>
            <FeaturesPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "jobs",
        element: <JobsPage />,
      },
      {
        path: "jobs/:id",
        element: <JobDetailsPage />,
      },
      {
        path: "forbidden",
        element: <Forbidden />,
      },
      {
        path: "oauth/callback",
        element: <OAuthCallbackPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  );
}

export default App;
