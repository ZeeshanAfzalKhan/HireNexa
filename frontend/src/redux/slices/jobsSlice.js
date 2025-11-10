import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Async Thunks
export const fetchAllJobs = createAsyncThunk(
  "jobs/fetchAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/job/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to fetch jobs");
    }
  }
);

export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/job/${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to fetch job");
    }
  }
);

export const postJob = createAsyncThunk(
  "jobs/postJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/job/post", jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to post job");
    }
  }
);

export const fetchAdminJobs = createAsyncThunk(
  "jobs/fetchAdminJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/job/adminjobs");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to fetch admin jobs");
    }
  }
);

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ jobId, jobData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/job/${jobId}`, jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to update job");
    }
  }
);

export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/job/${jobId}`);
      return jobId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to delete job");
    }
  }
);

// Initial State
const initialState = {
  jobs: [],
  currentJob: null,
  adminJobs: [],
  loading: false,
  error: null,
  message: null,
  filters: {
    keyword: "",
    location: "",
    jobType: "",
    experience: "",
  },
};

// Jobs Slice
const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setCurrentJob: (state, action) => {
      state.currentJob = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Jobs
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Job by ID
    builder
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload.job;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Post Job
    builder
      .addCase(postJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload.job);
        state.adminJobs.push(action.payload.job);
        state.message = action.payload.message || "Job posted successfully";
      })
      .addCase(postJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Admin Jobs
    builder
      .addCase(fetchAdminJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.adminJobs = action.payload.jobs;
      })
      .addCase(fetchAdminJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Job
    builder
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        const updatedJob = action.payload.job;
        state.jobs = state.jobs.map(job => 
          job._id === updatedJob._id ? updatedJob : job
        );
        state.adminJobs = state.adminJobs.map(job => 
          job._id === updatedJob._id ? updatedJob : job
        );
        if (state.currentJob && state.currentJob._id === updatedJob._id) {
          state.currentJob = updatedJob;
        }
        state.message = action.payload.message || "Job updated successfully";
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Job
    builder
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        const jobId = action.payload;
        state.jobs = state.jobs.filter(job => job._id !== jobId);
        state.adminJobs = state.adminJobs.filter(job => job._id !== jobId);
        if (state.currentJob && state.currentJob._id === jobId) {
          state.currentJob = null;
        }
        state.message = "Job deleted successfully";
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setJobs, setCurrentJob, setFilters, clearFilters, clearError, clearMessage } = jobsSlice.actions;

// Selectors
export const selectJobs = (state) => state.jobs.jobs;
export const selectCurrentJob = (state) => state.jobs.currentJob;
export const selectAdminJobs = (state) => state.jobs.adminJobs;
export const selectJobsLoading = (state) => state.jobs.loading;
export const selectJobsError = (state) => state.jobs.error;
export const selectJobsMessage = (state) => state.jobs.message;
export const selectFilters = (state) => state.jobs.filters;

export default jobsSlice.reducer;