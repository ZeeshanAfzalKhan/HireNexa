import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import jobsReducer from "./slices/jobsSlice";
import companyReducer from "./slices/companySlice";
import applicationReducer from "./slices/applicationSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    company: companyReducer,
    application: applicationReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});