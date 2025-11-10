import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Async Thunks
export const registerCompany = createAsyncThunk(
  "company/registerCompany",
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/company/register", companyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to register company");
    }
  }
);

export const getCompany = createAsyncThunk(
  "company/getCompany",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/company/getByUser");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to fetch company");
    }
  }
);

export const getCompanyById = createAsyncThunk(
  "company/getCompanyById",
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/company/get-by-id/${companyId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to fetch company by ID");
    }
  }
);

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async ({ companyId, companyData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/company/update/${companyId}`, companyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to update company");
    }
  }
);

export const updateCompanyLogo = createAsyncThunk(
  "company/updateCompanyLogo",
  async ({ companyId, logoFile }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("logo", logoFile);
      
      const response = await axiosInstance.patch(`/company/logo/update/${companyId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to update company logo");
    }
  }
);

export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (companyId, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/company/delete/${companyId}`);
      return companyId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to delete company");
    }
  }
);

// Initial State
const initialState = {
  company: null,
  companies: [],
  loading: false,
  error: null,
  message: null,
};

// Company Slice
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Register Company
    builder
      .addCase(registerCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload.company;
        state.message = action.payload.message || "Company registered successfully";
      })
      .addCase(registerCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Company
    builder
      .addCase(getCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload.company;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Company by ID
    builder
      .addCase(getCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        const company = action.payload.company;
        const existingIndex = state.companies.findIndex(c => c._id === company._id);
        if (existingIndex >= 0) {
          state.companies[existingIndex] = company;
        } else {
          state.companies.push(company);
        }
      })
      .addCase(getCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Company
    builder
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload.company;
        state.message = action.payload.message || "Company updated successfully";
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Company Logo
    builder
      .addCase(updateCompanyLogo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateCompanyLogo.fulfilled, (state, action) => {
        state.loading = false;
        if (state.company && state.company._id === action.payload.company._id) {
          state.company = action.payload.company;
        }
        state.message = action.payload.message || "Company logo updated successfully";
      })
      .addCase(updateCompanyLogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Company
    builder
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loading = false;
        const companyId = action.payload;
        if (state.company && state.company._id === companyId) {
          state.company = null;
        }
        state.companies = state.companies.filter(company => company._id !== companyId);
        state.message = "Company deleted successfully";
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCompany, clearError, clearMessage } = companySlice.actions;

// Selectors
export const selectCompany = (state) => state.company.company;
export const selectCompanies = (state) => state.company.companies;
export const selectCompanyLoading = (state) => state.company.loading;
export const selectCompanyError = (state) => state.company.error;
export const selectCompanyMessage = (state) => state.company.message;

export default companySlice.reducer;