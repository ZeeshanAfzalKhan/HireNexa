import { useDispatch, useSelector } from "react-redux";
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

  const handleApplyToJob = (jobId, applicationData) => dispatch(applyToJob({ jobId, applicationData }));
  const handleGetAppliedJobs = () => dispatch(getAppliedJobs());
  const handleGetApplications = (jobId) => dispatch(getApplications(jobId));
  const handleUpdateApplicationStatus = (applicationId, status) => dispatch(updateApplicationStatus({ applicationId, status }));

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