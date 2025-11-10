import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { 
  login, 
  signup, 
  logout, 
  getCurrentUser,
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectAuthMessage
} from "../slices/authSlice";

// Auth Hook
export const useAuth = () => {
  const dispatch = useDispatch();
  
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const message = useSelector(selectAuthMessage);

  const handleLogin = useCallback((credentials) => dispatch(login(credentials)), [dispatch]);
  const handleSignup = useCallback((userData) => dispatch(signup(userData)), [dispatch]);
  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);
  const handleGetCurrentUser = useCallback(() => dispatch(getCurrentUser()), [dispatch]);

  // Avoid auto-fetch loops; allow the app to explicitly hydrate on mount.

  return {
    auth,
    user,
    isAuthenticated,
    loading,
    error,
    message,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    getCurrentUser: handleGetCurrentUser,
  };
};