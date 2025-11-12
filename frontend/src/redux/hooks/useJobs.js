import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
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
  const totalJobs = useSelector((state) => state.jobs.totalJobs);
  const totalPages = useSelector((state) => state.jobs.totalPages);
  const currentPage = useSelector((state) => state.jobs.currentPage);

  const handleFetchAllJobs = useCallback(() => dispatch(fetchAllJobs()), [dispatch]);
  const handleFetchJobById = useCallback((jobId) => dispatch(fetchJobById(jobId)), [dispatch]);
  const handlePostJob = useCallback((jobData) => dispatch(postJob(jobData)), [dispatch]);
  const handleFetchAdminJobs = useCallback(() => dispatch(fetchAdminJobs()), [dispatch]);
  const handleUpdateJob = useCallback((jobId, jobData) => dispatch(updateJob({ jobId, jobData })), [dispatch]);
  const handleDeleteJob = useCallback((jobId) => dispatch(deleteJob(jobId)), [dispatch]);
  const handleSetJobs = useCallback((jobs) => dispatch(setJobs(jobs)), [dispatch]);
  const handleSetCurrentJob = useCallback((job) => dispatch(setCurrentJob(job)), [dispatch]);
  const handleSetFilters = useCallback((filters) => dispatch(setFilters(filters)), [dispatch]);
  const handleClearFilters = useCallback(() => dispatch(clearFilters()), [dispatch]);

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
    updateJob: handleUpdateJob,
    deleteJob: handleDeleteJob,
    setJobs: handleSetJobs,
    setCurrentJob: handleSetCurrentJob,
    setFilters: handleSetFilters,
    clearFilters: handleClearFilters,
  };
};