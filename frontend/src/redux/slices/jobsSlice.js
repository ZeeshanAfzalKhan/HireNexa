import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Async Thunks
export const fetchAllJobs = createAsyncThunk(
  "jobs/fetchAllJobs",
  async (params = {}, { rejectWithValue }) => {
    try {
      
      const response = await axiosInstance.get("/job/get", { params });
      
      return response.data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return rejectWithValue(error.response?.data?.error?.message || "Failed to fetch jobs");
    }
  }
);

export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/job/get-by-id/${jobId}`);
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
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/job/get-admin-jobs", { params });
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
      const response = await axiosInstance.patch(`/job/update/${jobId}`, jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to update job");
    }
  }
);

export const toggleJobStatus = createAsyncThunk(
  "jobs/toggleJobStatus",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/job/toggle-status/${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to toggle job status");
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
    skills: "",
    minSalary: "",
    maxSalary: "",
    minExperience: "",
    maxExperience: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
    limit: 10,
  },
  totalJobs: 0,
  totalPages: 0,
  currentPage: 1,
  adminTotalJobs: 0,
  adminTotalPages: 0,
  adminCurrentPage: 1,
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
        state.totalJobs = action.payload.totalJobs || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.currentPage || 1;
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
        state.adminTotalJobs = action.payload.totalJobs || 0;
        state.adminTotalPages = action.payload.totalPages || 0;
        state.adminCurrentPage = action.payload.currentPage || 1;
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
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        const updatedJob = action.payload.job;
        state.adminJobs = state.adminJobs.map(job => 
          job._id === updatedJob._id ? updatedJob : job
        );
        state.currentJob = updatedJob;
        state.message = action.payload.message;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Toggle Job Status
    builder
      .addCase(toggleJobStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleJobStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedJob = action.payload.job;
        state.adminJobs = state.adminJobs.map(job => 
          job._id === updatedJob._id ? updatedJob : job
        );
        state.message = action.payload.message;
      })
      .addCase(toggleJobStatus.rejected, (state, action) => {
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