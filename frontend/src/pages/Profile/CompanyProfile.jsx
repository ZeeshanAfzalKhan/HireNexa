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
  }, [dispatch]);

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
    // If no file selected yet, open the file picker for better UX
    if (!logoFile) {
      fileInputRef.current?.click();
      return;
    }
    dispatch(clearError());
    dispatch(clearMessage());
    setActiveAction('upload');
    dispatch(updateCompanyLogo({ companyId: company._id, logoFile }));
  };

  // Reset activeAction when loading completes
  useEffect(() => {
    if (!loading) {
      setActiveAction(null);
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Company Profile</h1>

        {/* Removed top loading banner; buttons now reflect operation progress */}

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200">{error}</div>
        )}

        {message && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">{message}</div>
        )}

        {!company && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Create Company</h2>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
                <input
                  type="text"
                  value={createForm.companyName}
                  onChange={(e) => setCreateForm({ ...createForm, companyName: e.target.value })}
                  className="mt-1 w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="e.g., Acme Inc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  className="mt-1 w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  rows={4}
                  placeholder="Brief description of your company"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 rounded bg-[#34aeeb] text-white hover:bg-[#279ed8] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {activeAction === 'create' && loading ? 'Creating...' : 'Create Company'}
              </button>
            </form>
          </div>
        )}

        {company && (
          <div className="space-y-8">
            {/* Show Company */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Company Info</h2>
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                  {company.logo?.logoURL ? (
                    <img src={company.logo.logoURL} alt="Company Logo" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">No Logo</span>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-medium">Name:</span> {company.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-medium">Description:</span> {company.description}</p>
                  {company.website && (
                    <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-medium">Website:</span> {company.website}</p>
                  )}
                  {company.location && (
                    <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-medium">Location:</span> {company.location}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Edit Company */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Edit Company</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="mt-1 w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    rows={4}
                    placeholder="Update company description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
                  <input
                    type="url"
                    value={editForm.website}
                    onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                    className="mt-1 w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="mt-1 w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="City, Country"
                  />
                </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 rounded bg-[#34aeeb] text-white hover:bg-[#279ed8] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {activeAction === 'save' && loading ? 'Saving...' : 'Save Changes'}
              </button>
              </form>
            </div>

            {/* Update Logo */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Update Logo</h2>
              <div className="flex items-center gap-4">
                {/* Hidden native input for better styling */}
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
                  className="inline-flex items-center px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  Choose File
                </label>
                <span className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[40%]">
                  {logoFile ? logoFile.name : 'No file selected'}
                </span>
                <button
                  type="button"
                  onClick={handleLogoUpload}
                  className="inline-flex items-center px-4 py-2 rounded bg-[#34aeeb] text-white hover:bg-[#279ed8] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {activeAction === 'upload' && loading ? 'Uploading...' : 'Upload Logo'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;