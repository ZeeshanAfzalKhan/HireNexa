// Custom error messages mapping for different error codes
export const ERROR_MESSAGES = {
  // Auth errors
  INVALID_CREDENTIALS: "Invalid email or password. Please try again.",
  USER_NOT_FOUND: "No account found with this email address.",
  EMAIL_ALREADY_EXISTS: "An account with this email already exists.",
  WEAK_PASSWORD: "Password must be at least 8 characters long.",
  INVALID_EMAIL: "Please enter a valid email address.",
  UNAUTHORIZED_ACCESS: "You don't have permission to access this resource.",
  TOKEN_EXPIRED: "Your session has expired. Please log in again.",
  
  // Application errors
  MISSING_JOB_ID: "Job information is missing. Please try again.",
  JOB_NOT_FOUND: "This job posting is no longer available.",
  DUPLICATE_APPLICATION: "You have already applied for this position.",
  INVALID_COVER_LETTER: "Cover letter must be between 20 and 5000 characters.",
  INVALID_FILE_TYPE: "Please upload a PDF file for your resume.",
  UPLOAD_FAILED: "Failed to upload your resume. Please try again.",
  MISSING_RESUME: "Please upload your resume to apply for this job.",
  APPLICATION_NOT_FOUND: "Application not found.",
  INVALID_STATUS_UPDATE: "Cannot update application status at this time.",
  NO_APPLICATIONS_FOUND: "No applications found.",
  
  // Job errors
  MISSING_REQUIRED_FIELDS: "Please fill in all required fields.",
  INVALID_SALARY_RANGE: "Please enter a valid salary range.",
  INVALID_EXPERIENCE_RANGE: "Please enter a valid experience range.",
  COMPANY_NOT_FOUND: "Company information not found.",
  
  // Profile errors
  INVALID_PHONE_NUMBER: "Please enter a valid phone number.",
  INVALID_DATE: "Please enter a valid date.",
  PROFILE_NOT_FOUND: "Profile not found.",
  MISSING_PROFILE_DATA: "Profile information is incomplete.",
  
  // Company errors
  COMPANY_ALREADY_EXISTS: "A company with this name already exists.",
  INVALID_COMPANY_DATA: "Please provide valid company information.",
  MISSING_COMPANY_ID: "Company ID is required.",
  
  // Generic errors
  INTERNAL_SERVER_ERROR: "Something went wrong. Please try again later.",
  NETWORK_ERROR: "Network error. Please check your connection.",
  VALIDATION_ERROR: "Please check your input and try again.",
  MISSING_STATUS: "Status information is required.",
  
  // Default fallback
  DEFAULT: "An unexpected error occurred. Please try again."
};

// Success messages for different actions
export const SUCCESS_MESSAGES = {
  // Auth success
  LOGIN_SUCCESS: "Welcome back! You've been logged in successfully.",
  LOGOUT_SUCCESS: "You've been logged out successfully.",
  SIGNUP_SUCCESS: "Account created successfully! Welcome to HireNexa.",
  
  // Application success
  APPLICATION_SUBMITTED: "Your application has been submitted successfully!",
  APPLICATION_STATUS_UPDATED: "Application status updated successfully.",
  APPLICATIONS_LOADED: "Applications loaded successfully.",
  
  // Job success
  JOB_POSTED: "Job posted successfully!",
  JOB_UPDATED: "Job updated successfully.",
  JOB_DELETED: "Job deleted successfully.",
  JOBS_LOADED: "Jobs loaded successfully.",
  
  // Profile success
  PROFILE_UPDATED: "Your profile has been updated successfully.",
  PROFILE_PICTURE_UPLOADED: "Profile picture updated successfully.",
  RESUME_UPLOADED: "Resume uploaded successfully.",
  PASSWORD_CHANGED: "Password changed successfully.",
  
  // Company success
  COMPANY_REGISTERED: "Company registered successfully!",
  COMPANY_UPDATED: "Company information updated successfully.",
  COMPANY_LOGO_UPDATED: "Company logo updated successfully.",
  COMPANY_DELETED: "Company deleted successfully.",
  
  // Default success
  DEFAULT: "Operation completed successfully."
};

// Function to get custom error message
export const getErrorMessage = (errorCode, fallbackMessage = null) => {
  return ERROR_MESSAGES[errorCode] || fallbackMessage || ERROR_MESSAGES.DEFAULT;
};

// Function to get custom success message
export const getSuccessMessage = (actionType, fallbackMessage = null) => {
  return SUCCESS_MESSAGES[actionType] || fallbackMessage || SUCCESS_MESSAGES.DEFAULT;
};