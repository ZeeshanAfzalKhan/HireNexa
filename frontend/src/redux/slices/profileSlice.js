import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});



// Async Thunks
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to fetch profile");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/profile/update", profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to update profile");
    }
  }
);

export const deleteProfile = createAsyncThunk(
  "profile/deleteProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/profile/delete");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to delete profile");
    }
  }
);

export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/profile/change-password", passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to change password");
    }
  }
);

export const uploadProfilePicture = createAsyncThunk(
  "profile/uploadProfilePicture",
  async (profilePicture, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);
      
      const response = await axiosInstance.post("/profile/upload-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to upload profile picture");
    }
  }
);

export const uploadResume = createAsyncThunk(
  "profile/uploadResume",
  async (resume, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      
      const response = await axiosInstance.post("/profile/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Failed to upload resume");
    }
  }
);

// Initial State
const initialState = {
  profile: null,
  loading: false,
  error: null,
  message: null,
};

// Profile Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
        state.message = action.payload.message || "Profile loaded successfully";
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
        state.message = action.payload.message || "Profile updated successfully";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Profile
    builder
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
        state.message = "Profile deleted successfully";
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Change Password
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Password changed successfully";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Upload Profile Picture
    builder
      .addCase(uploadProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.profilePicture = action.payload.user.profilePicture;
        }
        state.message = action.payload.message || "Profile picture uploaded successfully";
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Upload Resume
    builder
      .addCase(uploadResume.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.resume = action.payload.user.resume;
        }
        state.message = action.payload.message || "Resume uploaded successfully";
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProfile, clearError, clearMessage } = profileSlice.actions;

// Selectors
export const selectProfile = (state) => state.profile.profile;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectProfileError = (state) => state.profile.error;
export const selectProfileMessage = (state) => state.profile.message;

export default profileSlice.reducer;