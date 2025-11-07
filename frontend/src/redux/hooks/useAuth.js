import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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

  const handleLogin = (credentials) => dispatch(login(credentials));
  const handleSignup = (userData) => dispatch(signup(userData));
  const handleLogout = () => dispatch(logout());
  const handleGetCurrentUser = () => dispatch(getCurrentUser());

  useEffect(() => {
    if (!user && isAuthenticated) {
      handleGetCurrentUser();
    }
  }, [dispatch, user, isAuthenticated]);

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