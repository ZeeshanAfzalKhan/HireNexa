import { useDispatch, useSelector } from "react-redux";
import { 
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
  updateCompanyLogo,
  deleteCompany,
  setCompany,
  selectCompany,
  selectCompanies,
  selectCompanyLoading,
  selectCompanyError,
  selectCompanyMessage
} from "../slices/companySlice";

// Company Hook
export const useCompany = () => {
  const dispatch = useDispatch();
  
  const company = useSelector(selectCompany);
  const companies = useSelector(selectCompanies);
  const loading = useSelector(selectCompanyLoading);
  const error = useSelector(selectCompanyError);
  const message = useSelector(selectCompanyMessage);

  const handleRegisterCompany = (companyData) => dispatch(registerCompany(companyData));
  const handleGetCompany = () => dispatch(getCompany());
  const handleGetCompanyById = (companyId) => dispatch(getCompanyById(companyId));
  const handleUpdateCompany = (companyId, companyData) => dispatch(updateCompany({ companyId, companyData }));
  const handleUpdateCompanyLogo = (companyId, logoFile) => dispatch(updateCompanyLogo({ companyId, logoFile }));
  const handleDeleteCompany = (companyId) => dispatch(deleteCompany(companyId));
  const handleSetCompany = (company) => dispatch(setCompany(company));

  return {
    company,
    companies,
    loading,
    error,
    message,
    registerCompany: handleRegisterCompany,
    getCompany: handleGetCompany,
    getCompanyById: handleGetCompanyById,
    updateCompany: handleUpdateCompany,
    updateCompanyLogo: handleUpdateCompanyLogo,
    deleteCompany: handleDeleteCompany,
    setCompany: handleSetCompany,
  };
};