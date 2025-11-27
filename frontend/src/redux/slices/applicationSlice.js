import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});



// Async Thunks
export const applyToJob = createAsyncThunk(
  "application/applyToJob",
  async ({ jobId, applicationData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (applicationData.coverLetter) {
        formData.append("coverLetter", applicationData.coverLetter);
      }
      if (applicationData.resume) {
        formData.append("resume", applicationData.resume);
      }
      
      const response = await axiosInstance.post(`/application/apply/${jobId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to apply to job");
    }
  }
);

export const getAppliedJobs = createAsyncThunk(
  "application/getAppliedJobs",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/application/get", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to fetch applied jobs");
    }
  }
);

export const getApplications = createAsyncThunk(
  "application/getApplications",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/application/${jobId}/applications`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to fetch applications");
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  "application/updateApplicationStatus",
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/application/status/${applicationId}/update`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to update application status");
    }
  }
);

// Initial State
const initialState = {
  applications: [],
  appliedJobs: [],
  loading: false,
  error: null,
  message: null,
  totalApplications: 0,
  totalPages: 0,
  currentPage: 1,
};

// Application Slice
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Apply to Job
    builder
      .addCase(applyToJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload.application);
        state.message = action.payload.message || "Application submitted successfully";
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Applied Jobs
    builder
      .addCase(getAppliedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getAppliedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedJobs = action.payload.applications;
        state.totalApplications = action.payload.totalApplications || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.currentPage || 1;
        state.message = action.payload.message || "Applied jobs loaded successfully";
      })
      .addCase(getAppliedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Applications
    builder
      .addCase(getApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload.applications;
        state.message = action.payload.message || "Applications loaded successfully";
      })
      .addCase(getApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Application Status
    builder
      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedApplication = action.payload.application;
        if (updatedApplication) {
          state.applications = state.applications.map(app => 
            app._id === updatedApplication._id ? { ...app, status: updatedApplication.status } : app
          );
          state.appliedJobs = state.appliedJobs.map(app => 
            app._id === updatedApplication._id ? { ...app, status: updatedApplication.status } : app
          );
        }
        state.message = action.payload.message || "Application status updated successfully";
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearMessage } = applicationSlice.actions;

// Selectors
export const selectApplications = (state) => state.application.applications;
export const selectAppliedJobs = (state) => state.application.appliedJobs;
export const selectApplicationLoading = (state) => state.application.loading;
export const selectApplicationError = (state) => state.application.error;
export const selectApplicationMessage = (state) => state.application.message;

export default applicationSlice.reducer;