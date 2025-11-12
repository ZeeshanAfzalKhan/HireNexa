import { useEffect } from "react";
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

export const useToastNotifications = () => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (authError) {
      toast.error(authError);
      dispatch(clearAuthError());
    }
    if (authMessage) {
      toast.success(authMessage);
      dispatch(clearAuthMessage());
    }
  }, [authError, authMessage, dispatch]);

  useEffect(() => {
    if (jobsError) {
      toast.error(jobsError);
      dispatch(clearJobsError());
    }
    if (jobsMessage) {
      toast.success(jobsMessage);
      dispatch(clearJobsMessage());
    }
  }, [jobsError, jobsMessage, dispatch]);

  useEffect(() => {
    if (applicationError) {
      toast.error(applicationError);
      dispatch(clearApplicationError());
    }
    if (applicationMessage) {
      toast.success(applicationMessage);
      dispatch(clearApplicationMessage());
    }
  }, [applicationError, applicationMessage, dispatch]);

  useEffect(() => {
    if (profileError) {
      toast.error(profileError);
      dispatch(clearProfileError());
    }
    if (profileMessage) {
      toast.success(profileMessage);
      dispatch(clearProfileMessage());
    }
  }, [profileError, profileMessage, dispatch]);

  useEffect(() => {
    if (companyError) {
      toast.error(companyError);
      dispatch(clearCompanyError());
    }
    if (companyMessage) {
      toast.success(companyMessage);
      dispatch(clearCompanyMessage());
    }
  }, [companyError, companyMessage, dispatch]);
};
