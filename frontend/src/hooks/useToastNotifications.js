import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  selectAuthError,
  selectAuthMessage,
  clearError as clearAuthError,
  clearMessage as clearAuthMessage,
} from "../redux/slices/authSlice";
import {
  selectJobsError,
  selectJobsMessage,
  clearError as clearJobsError,
  clearMessage as clearJobsMessage,
} from "../redux/slices/jobsSlice";
import {
  selectApplicationError,
  selectApplicationMessage,
  clearError as clearApplicationError,
  clearMessage as clearApplicationMessage,
} from "../redux/slices/applicationSlice";
import {
  selectProfileError,
  selectProfileMessage,
  clearError as clearProfileError,
  clearMessage as clearProfileMessage,
} from "../redux/slices/profileSlice";
import {
  selectCompanyError,
  selectCompanyMessage,
  clearError as clearCompanyError,
  clearMessage as clearCompanyMessage,
} from "../redux/slices/companySlice";

const TOAST_CONFIG = {
  error: {
    duration: 4000,
    icon: '❌',
  },
  success: {
    duration: 3000,
    icon: '✅',
  },
};

const useNotificationHandler = (error, message, clearError, clearMessage) => {
  const dispatch = useDispatch();
  const shownNotifications = useRef(new Set());

  useEffect(() => {
    if (error && !shownNotifications.current.has(error)) {
      shownNotifications.current.add(error);
      toast.error(error, TOAST_CONFIG.error);
      dispatch(clearError());
      setTimeout(() => shownNotifications.current.delete(error), 100);
    }
  }, [error, dispatch, clearError]);

  useEffect(() => {
    if (message && !shownNotifications.current.has(message)) {
      shownNotifications.current.add(message);
      toast.success(message, TOAST_CONFIG.success);
      dispatch(clearMessage());
      setTimeout(() => shownNotifications.current.delete(message), 100);
    }
  }, [message, dispatch, clearMessage]);
};

export const useToastNotifications = () => {
  const authError = useSelector(selectAuthError);
  const authMessage = useSelector(selectAuthMessage);
  const jobsError = useSelector(selectJobsError);
  const jobsMessage = useSelector(selectJobsMessage);
  const applicationError = useSelector(selectApplicationError);
  const applicationMessage = useSelector(selectApplicationMessage);
  const profileError = useSelector(selectProfileError);
  const profileMessage = useSelector(selectProfileMessage);
  const companyError = useSelector(selectCompanyError);
  const companyMessage = useSelector(selectCompanyMessage);

  useNotificationHandler(authError, authMessage, clearAuthError, clearAuthMessage);
  useNotificationHandler(jobsError, jobsMessage, clearJobsError, clearJobsMessage);
  useNotificationHandler(applicationError, applicationMessage, clearApplicationError, clearApplicationMessage);
  useNotificationHandler(profileError, profileMessage, clearProfileError, clearProfileMessage);
  useNotificationHandler(companyError, companyMessage, clearCompanyError, clearCompanyMessage);
};
