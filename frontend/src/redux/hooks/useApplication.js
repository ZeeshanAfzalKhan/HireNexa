import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { 
  applyToJob,
  getAppliedJobs,
  getApplications,
  updateApplicationStatus,
  selectApplications,
  selectAppliedJobs,
  selectApplicationLoading,
  selectApplicationError,
  selectApplicationMessage
} from "../slices/applicationSlice";

// Application Hook
export const useApplication = () => {
  const dispatch = useDispatch();
  
  const applications = useSelector(selectApplications);
  const appliedJobs = useSelector(selectAppliedJobs);
  const loading = useSelector(selectApplicationLoading);
  const error = useSelector(selectApplicationError);
  const message = useSelector(selectApplicationMessage);

  const handleApplyToJob = useCallback((jobId, applicationData) => dispatch(applyToJob({ jobId, applicationData })), [dispatch]);
  const handleGetAppliedJobs = useCallback((params) => dispatch(getAppliedJobs(params)), [dispatch]);
  const handleGetApplications = useCallback((jobId) => dispatch(getApplications(jobId)), [dispatch]);
  const handleUpdateApplicationStatus = useCallback((applicationId, status) => dispatch(updateApplicationStatus({ applicationId, status })), [dispatch]);

  return {
    applications,
    appliedJobs,
    loading,
    error,
    message,
    applyToJob: handleApplyToJob,
    getAppliedJobs: handleGetAppliedJobs,
    getApplications: handleGetApplications,
    updateApplicationStatus: handleUpdateApplicationStatus,
  };
};