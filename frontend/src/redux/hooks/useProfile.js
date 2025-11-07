import { useDispatch, useSelector } from "react-redux";
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

  const handleGetProfile = () => dispatch(getProfile());
  const handleUpdateProfile = (profileData) => dispatch(updateProfile(profileData));
  const handleDeleteProfile = () => dispatch(deleteProfile());
  const handleChangePassword = (passwordData) => dispatch(changePassword(passwordData));
  const handleUploadProfilePicture = (profilePicture) => dispatch(uploadProfilePicture(profilePicture));
  const handleUploadResume = (resume) => dispatch(uploadResume(resume));
  const handleSetProfile = (profile) => dispatch(setProfile(profile));

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