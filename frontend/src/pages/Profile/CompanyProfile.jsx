import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerCompany,
  getCompany,
  updateCompany,
  updateCompanyLogo,
  selectCompany,
  selectCompanyLoading,
  selectCompanyError,
  selectCompanyMessage,
  clearError,
  clearMessage,
} from '../../redux/slices/companySlice';
import { Building2, Globe, MapPin, Upload, Edit3, Plus, Camera } from 'lucide-react';

const CompanyProfile = () => {
  const dispatch = useDispatch();
  const company = useSelector(selectCompany);
  const loading = useSelector(selectCompanyLoading);
  const error = useSelector(selectCompanyError);
  const message = useSelector(selectCompanyMessage);

  const [createForm, setCreateForm] = useState({ companyName: '', description: '' });
  const [editForm, setEditForm] = useState({ description: '', website: '', location: '' });
  const [logoFile, setLogoFile] = useState(null);
  const [activeAction, setActiveAction] = useState(null); // 'create' | 'save' | 'upload' | null
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getCompany());
  }, []);

  useEffect(() => {
    if (company) {
      setEditForm({
        description: company.description || '',
        website: company.website || '',
        location: company.location || '',
      });
    }
  }, [company]);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(clearMessage());
    setActiveAction('create');
    dispatch(registerCompany(createForm));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!company?._id) return;
    dispatch(clearError());
    dispatch(clearMessage());
    setActiveAction('save');
    dispatch(updateCompany({ companyId: company._id, companyData: editForm }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    setLogoFile(file || null);
  };

  const handleLogoUpload = () => {
    if (!company?._id) return;
    if (!logoFile) {
      fileInputRef.current?.click();
      return;
    }
    dispatch(clearError());
    dispatch(clearMessage());
    setActiveAction('upload');
    dispatch(updateCompanyLogo({ companyId: company._id, logoFile }));
  };

  useEffect(() => {
    if (!loading) {
      setActiveAction(null);
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#34aeeb] rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Company Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Manage your company information and branding</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300 flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            {message}
          </div>
        )}

        {!company && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-[#34aeeb] px-8 py-6">
              <div className="flex items-center gap-3">
                <Plus className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Create Your Company</h2>
              </div>
              <p className="text-blue-100 mt-2">Set up your company profile to start posting jobs</p>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Building2 className="w-4 h-4" />
                  Company Name
                </label>
                <input
                  type="text"
                  value={createForm.companyName}
                  onChange={(e) => setCreateForm({ ...createForm, companyName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
                  placeholder="e.g., Acme Inc."
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Edit3 className="w-4 h-4" />
                  Description
                </label>
                <textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all resize-none"
                  rows={4}
                  placeholder="Brief description of your company, mission, and values"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#34aeeb] text-white font-semibold rounded-xl hover:bg-[#279ed8] focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loading}
              >
                {activeAction === 'create' && loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Company...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Create Company
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {company && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Company Overview Card */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-[#34aeeb] px-8 py-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Building2 className="w-6 h-6" />
                    Company Overview
                  </h2>
                </div>
                <div className="p-8">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center overflow-hidden shadow-lg">
                        {company.logo?.logoURL ? (
                          <img src={company.logo.logoURL} alt="Company Logo" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center">
                            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">No Logo</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{company.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{company.description}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {company.website && (
                          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <Globe className="w-5 h-5 text-[#34aeeb]" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Website</p>
                              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-[#34aeeb] hover:underline font-medium">
                                {company.website.replace(/^https?:\/\//, '')}
                              </a>
                            </div>
                          </div>
                        )}
                        {company.location && (
                          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <MapPin className="w-5 h-5 text-[#34aeeb]" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Location</p>
                              <p className="text-gray-900 dark:text-white font-medium">{company.location}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Upload Card */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-[#34aeeb] px-6 py-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Update Logo
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <label
                    htmlFor="logo-upload"
                    className="block w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-[#34aeeb] dark:hover:border-[#34aeeb] transition-colors cursor-pointer group"
                  >
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#34aeeb] mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-[#34aeeb]">
                        Click to choose file
                      </p>
                    </div>
                  </label>
                  {logoFile && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{logoFile.name}</p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleLogoUpload}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#34aeeb] text-white font-semibold rounded-xl hover:bg-[#279ed8] focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={loading}
                  >
                    {activeAction === 'upload' && loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Upload Logo
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Edit Company Form */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-[#34aeeb] px-8 py-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Edit3 className="w-6 h-6" />
                    Edit Company Information
                  </h2>
                  <p className="text-blue-100 mt-2">Update your company details and information</p>
                </div>
                <form onSubmit={handleEditSubmit} className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="lg:col-span-2 space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Edit3 className="w-4 h-4" />
                        Description
                      </label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all resize-none"
                        rows={4}
                        placeholder="Update company description, mission, and values"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Globe className="w-4 h-4" />
                        Website
                      </label>
                      <input
                        type="url"
                        value={editForm.website}
                        onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <MapPin className="w-4 h-4" />
                        Location
                      </label>
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-8 py-3 bg-[#34aeeb] text-white font-semibold rounded-xl hover:bg-[#279ed8] focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                      disabled={loading}
                    >
                      {activeAction === 'save' && loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-5 h-5" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;