import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useProfile } from '../../redux/hooks/useProfile';
import { clearError, clearMessage } from '../../redux/slices/profileSlice';

const CandidateProfile = () => {
  const dispatch = useDispatch();
  const {
    profile,
    loading,
    error,
    message,
    getProfile,
    updateProfile,
    uploadProfilePicture,
    uploadResume,
  } = useProfile();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    phoneNumber: '',
    bio: '',
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [activeAction, setActiveAction] = useState(null); // 'save' | 'uploadPic' | 'uploadResume'
  const picInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        emailId: profile.emailId || '',
        phoneNumber: profile.phoneNumber || '',
        bio: profile.profile?.bio || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (!loading && activeAction) {
      setActiveAction(null);
    }
  }, [loading, activeAction]);

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => dispatch(clearMessage()), 3000);
      return () => clearTimeout(t);
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => dispatch(clearError()), 4000);
      return () => clearTimeout(t);
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setActiveAction('save');
    await updateProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNumber: form.phoneNumber,
      profile: { bio: form.bio },
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0] || null;
    setProfilePictureFile(file);
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0] || null;
    setResumeFile(file);
  };

  const handleUploadPicture = async () => {
    if (!profilePictureFile) return;
    setActiveAction('uploadPic');
    await uploadProfilePicture(profilePictureFile);
  };

  const handleUploadResume = async () => {
    if (!resumeFile) return;
    setActiveAction('uploadResume');
    await uploadResume(resumeFile);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Candidate Profile</h1>

      {/* Feedback */}
      {message && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-200">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-200">
          {error}
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
              placeholder="Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="emailId"
              value={form.emailId}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
              placeholder="john@example.com"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
              placeholder="1234567890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
              rows={4}
              placeholder="Short summary about your skills and experience"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md bg-[#34aeeb] text-white hover:bg-[#2a8bc7] transition disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {loading && activeAction === 'save' ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Uploads */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
          <input
            ref={picInputRef}
            id="profile-picture-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePictureChange}
          />
          <div className="flex items-center gap-3">
            <label
              htmlFor="profile-picture-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Choose File
            </label>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {profilePictureFile ? profilePictureFile.name : 'No file selected'}
            </span>
          </div>
          <button
            onClick={handleUploadPicture}
            disabled={loading || !profilePictureFile}
            className="mt-4 px-4 py-2 rounded-md bg-[#34aeeb] text-white hover:bg-[#2a8bc7] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && activeAction === 'uploadPic' ? 'Uploading...' : 'Upload Picture'}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Resume</h2>
          <input
            ref={resumeInputRef}
            id="resume-upload"
            type="file"
            accept="application/pdf,.doc,.docx"
            className="hidden"
            onChange={handleResumeChange}
          />
          <div className="flex items-center gap-3">
            <label
              htmlFor="resume-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Choose File
            </label>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {resumeFile ? resumeFile.name : 'No file selected'}
            </span>
          </div>
          <button
            onClick={handleUploadResume}
            disabled={loading || !resumeFile}
            className="mt-4 px-4 py-2 rounded-md bg-[#34aeeb] text-white hover:bg-[#2a8bc7] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && activeAction === 'uploadResume' ? 'Uploading...' : 'Upload Resume'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;