// Store
export { store } from "./store";
// Slices
export { 
  login, 
  signup, 
  logout, 
  getCurrentUser,
  clearMessage as clearAuthMessage,
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectAuthMessage
} from "./slices/authSlice.js";

export { 
  fetchAllJobs,
  fetchJobById,
  postJob,
  fetchAdminJobs,
  updateJob,
  deleteJob,
  setJobs,
  setCurrentJob,
  setFilters,
  clearFilters,
  clearMessage as clearJobsMessage,
  selectJobs,
  selectCurrentJob,
  selectAdminJobs,
  selectJobsLoading,
  selectJobsError,
  selectFilters,
  selectJobsMessage
} from "./slices/jobsSlice";

export { 
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
  updateCompanyLogo,
  deleteCompany,
  setCompany,
  clearMessage as clearCompanyMessage,
  selectCompany,
  selectCompanies,
  selectCompanyLoading,
  selectCompanyError,
  selectCompanyMessage
} from "./slices/companySlice";

export { 
  getProfile,
  updateProfile,
  deleteProfile,
  changePassword,
  uploadProfilePicture,
  uploadResume,
  setProfile,
  clearMessage as clearProfileMessage,
  selectProfile,
  selectProfileLoading,
  selectProfileError,
  selectProfileMessage
} from "./slices/profileSlice";

export { 
  applyToJob,
  getAppliedJobs,
  getApplications,
  updateApplicationStatus,
  clearMessage as clearApplicationMessage,
  selectApplications,
  selectAppliedJobs,
  selectApplicationLoading,
  selectApplicationError,
  selectApplicationMessage
} from "./slices/applicationSlice";

// Hooks
export { 
  useAuth,
  useJobs,
  useCompany,
  useProfile,
  useApplication
} from "./hooks";