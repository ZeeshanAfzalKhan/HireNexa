import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { 
  getProfile,
  updateProfile,
  deleteProfile,
  changePassword,
  uploadProfilePicture,
  uploadResume,
  setProfile,
  selectProfile,
  selectProfileLoading,
  selectProfileError,
  selectProfileMessage
} from "../slices/profileSlice";

// Profile Hook
export const useProfile = () => {
  const dispatch = useDispatch();
  
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);
  const message = useSelector(selectProfileMessage);

  const handleGetProfile = useCallback(() => dispatch(getProfile()), [dispatch]);
  const handleUpdateProfile = useCallback((profileData) => dispatch(updateProfile(profileData)), [dispatch]);
  const handleDeleteProfile = useCallback(() => dispatch(deleteProfile()), [dispatch]);
  const handleChangePassword = useCallback((passwordData) => dispatch(changePassword(passwordData)), [dispatch]);
  const handleUploadProfilePicture = useCallback((profilePicture) => dispatch(uploadProfilePicture(profilePicture)), [dispatch]);
  const handleUploadResume = useCallback((resume) => dispatch(uploadResume(resume)), [dispatch]);
  const handleSetProfile = useCallback((profile) => dispatch(setProfile(profile)), [dispatch]);

  return {
    profile,
    loading,
    error,
    message,
    getProfile: handleGetProfile,
    updateProfile: handleUpdateProfile,
    deleteProfile: handleDeleteProfile,
    changePassword: handleChangePassword,
    uploadProfilePicture: handleUploadProfilePicture,
    uploadResume: handleUploadResume,
    setProfile: handleSetProfile,
  };
};