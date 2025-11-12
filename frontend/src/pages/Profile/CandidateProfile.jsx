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
    addSkills,
    deleteSkill,
  } = useProfile();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    phoneNumber: '',
    bio: '',
    skills: [],
    linkedIn: '',
    github: '',
    website: '',
  });
  const [skillInput, setSkillInput] = useState('');
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
        skills: profile.profile?.skills || [],
        linkedIn: profile.profile?.socials?.linkedIn || '',
        github: profile.profile?.socials?.github || '',
        website: profile.profile?.socials?.website || '',
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
      profile: { 
        bio: form.bio,
        skills: form.skills,
        socials: {
          linkedIn: form.linkedIn,
          github: form.github,
          website: form.website,
        }
      },
    });
  };

  const addSkill = async (e) => {
    if (e) e.preventDefault();
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && trimmedSkill.length >= 2 && trimmedSkill.length <= 50) {
      await addSkills(trimmedSkill);
      setSkillInput('');
    }
  };

  const removeSkill = async (skillToRemove) => {
    await deleteSkill(skillToRemove);
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

      {/* Current Profile Picture */}
      {profile?.profile?.profilePicture?.profilePictureURL && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Current Profile Picture</h2>
          <img 
            src={profile.profile.profilePicture.profilePictureURL} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
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
          <div className="flex items-center justify-between mt-1 text-xs">
            <span className="text-gray-500">Maximum 200 characters</span>
            <span className={form.bio.length > 500 ? "text-red-400" : "text-green-400"}>
              {form.bio.length}/500 characters
            </span>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Skills</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill(e)}
              className="flex-1 border rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
              placeholder="Add a skill"
              maxLength={50}
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                  disabled={loading}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">{form.skills.length}/30 skills</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-medium mb-3">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <input
                type="url"
                name="linkedIn"
                value={form.linkedIn}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub</label>
              <input
                type="url"
                name="github"
                value={form.github}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <input
                type="url"
                name="website"
                value={form.website}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
                placeholder="https://yourwebsite.com"
              />
            </div>
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

      {/* Resume Upload */}
      <div className="mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Resume</h2>
          {profile?.profile?.resume?.resumeURL && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
              <p className="text-sm text-green-700 dark:text-green-300 mb-2">Current Resume:</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{profile.profile.resume.resumeOriginalName}</span>
                <a
                  href={profile.profile.resume.resumeURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  View
                </a>
              </div>
            </div>
          )}
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