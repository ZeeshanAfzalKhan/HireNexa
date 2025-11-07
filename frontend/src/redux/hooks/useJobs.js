import { useDispatch, useSelector } from "react-redux";
import { 
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
  selectJobs,
  selectCurrentJob,
  selectAdminJobs,
  selectJobsLoading,
  selectJobsError,
  selectFilters,
  selectJobsMessage
} from "../slices/jobsSlice";

// Jobs Hook
export const useJobs = () => {
  const dispatch = useDispatch();
  
  const jobs = useSelector(selectJobs);
  const currentJob = useSelector(selectCurrentJob);
  const adminJobs = useSelector(selectAdminJobs);
  const loading = useSelector(selectJobsLoading);
  const error = useSelector(selectJobsError);
  const filters = useSelector(selectFilters);
  const message = useSelector(selectJobsMessage);

  const handleFetchAllJobs = () => dispatch(fetchAllJobs());
  const handleFetchJobById = (jobId) => dispatch(fetchJobById(jobId));
  const handlePostJob = (jobData) => dispatch(postJob(jobData));
  const handleFetchAdminJobs = () => dispatch(fetchAdminJobs());
  const handleUpdateJob = (jobId, jobData) => dispatch(updateJob({ jobId, jobData }));
  const handleDeleteJob = (jobId) => dispatch(deleteJob(jobId));
  const handleSetJobs = (jobs) => dispatch(setJobs(jobs));
  const handleSetCurrentJob = (job) => dispatch(setCurrentJob(job));
  const handleSetFilters = (filters) => dispatch(setFilters(filters));
  const handleClearFilters = () => dispatch(clearFilters());

  return {
    jobs,
    currentJob,
    adminJobs,
    loading,
    error,
    filters,
    message,
    fetchAllJobs: handleFetchAllJobs,
    fetchJobById: handleFetchJobById,
    postJob: handlePostJob,
    fetchAdminJobs: handleFetchAdminJobs,
    updateJob: handleUpdateJob,
    deleteJob: handleDeleteJob,
    setJobs: handleSetJobs,
    setCurrentJob: handleSetCurrentJob,
    setFilters: handleSetFilters,
    clearFilters: handleClearFilters,
  };
};