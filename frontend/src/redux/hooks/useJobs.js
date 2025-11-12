import { useDispatch, useSelector } from "react-redux";
import { 
  fetchAllJobs,
  fetchJobById,
  postJob,
  fetchAdminJobs,
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
  const totalJobs = useSelector((state) => state.jobs.totalJobs);
  const totalPages = useSelector((state) => state.jobs.totalPages);
  const currentPage = useSelector((state) => state.jobs.currentPage);

  const handleFetchAllJobs = () => dispatch(fetchAllJobs());
  const handleFetchJobById = (jobId) => dispatch(fetchJobById(jobId));
  const handlePostJob = (jobData) => dispatch(postJob(jobData));
  const handleFetchAdminJobs = () => dispatch(fetchAdminJobs());
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
    totalJobs,
    totalPages,
    currentPage,
    fetchAllJobs: handleFetchAllJobs,
    fetchJobById: handleFetchJobById,
    postJob: handlePostJob,
    fetchAdminJobs: handleFetchAdminJobs,
    setJobs: handleSetJobs,
    setCurrentJob: handleSetCurrentJob,
    setFilters: handleSetFilters,
    clearFilters: handleClearFilters,
  };
};