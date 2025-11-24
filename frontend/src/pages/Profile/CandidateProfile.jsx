import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useProfile } from '../../redux/hooks/useProfile';
import { clearError, clearMessage } from '../../redux/slices/profileSlice';
import { User, Mail, Phone, FileText, Globe, Github, Linkedin, Upload, Edit3, Plus, X } from 'lucide-react';

const CandidateProfile = () => {
  const dispatch = useDispatch();
  const {
    profile,
    loading,
    error,
    message,
    getProfile,
    updateProfile,
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
  const [resumeFile, setResumeFile] = useState(null);
  const [activeAction, setActiveAction] = useState(null); // 'save' | 'uploadResume'
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

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0] || null;
    setResumeFile(file);
  };

  const handleUploadResume = async () => {
    if (!resumeFile) return;
    setActiveAction('uploadResume');
    await uploadResume(resumeFile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#34aeeb] rounded-2xl mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Candidate Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Manage your professional profile and skills</p>
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

        <div className="grid grid-cols-1 gap-8">
          {/* Edit Profile Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-[#34aeeb] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Edit3 className="w-6 h-6" />
                Edit Profile Information
              </h2>
              <p className="text-blue-100 mt-2">Update your personal details and professional information</p>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <User className="w-4 h-4" />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <User className="w-4 h-4" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
                    placeholder="Enter last name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="emailId"
                    value={form.emailId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all opacity-60"
                    placeholder="Enter email"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="lg:col-span-2 space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Edit3 className="w-4 h-4" />
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all resize-none"
                  rows={4}
                  placeholder="Brief summary about your skills and experience"
                />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">Maximum 500 characters</span>
                  <span className={form.bio.length > 500 ? "text-red-400" : "text-green-400"}>
                    {form.bio.length}/500 characters
                  </span>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Plus className="w-4 h-4" />
                  Skills
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill(e)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
                    placeholder="Add a skill"
                    maxLength={50}
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="flex items-center gap-2 px-6 py-3 bg-[#34aeeb] text-white font-semibold rounded-xl hover:bg-[#279ed8] transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-xl text-sm font-medium border border-blue-200 dark:border-blue-800"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 cursor-pointer"
                        disabled={loading}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{form.skills.length}/30 skills</p>
              </div>

              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      name="linkedIn"
                      value={form.linkedIn}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <Github className="w-4 h-4" />
                      GitHub
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={form.github}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <Globe className="w-4 h-4" />
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 bg-[#34aeeb] text-white font-semibold rounded-xl hover:bg-[#279ed8] focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
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

          {/* Resume Upload Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-[#34aeeb] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FileText className="w-6 h-6" />
                Resume Management
              </h2>
              <p className="text-blue-100 mt-2">Upload and manage your resume document</p>
            </div>
            <div className="p-8">
              {profile?.profile?.resume?.resumeURL && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">Current Resume:</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-blue-700 dark:text-blue-300">{profile.profile.resume.resumeOriginalName}</span>
                        <a
                          href={profile.profile.resume.resumeURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#34aeeb] hover:underline text-sm font-medium"
                        >
                          View Resume
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <input
                ref={resumeInputRef}
                type="file"
                accept="application/pdf,.doc,.docx"
                className="hidden"
                onChange={handleResumeChange}
              />
              <div className="space-y-4">
                <label
                  onClick={() => resumeInputRef.current?.click()}
                  className="block w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-[#34aeeb] dark:hover:border-[#34aeeb] transition-colors cursor-pointer group"
                >
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#34aeeb] mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-[#34aeeb]">
                      Click to choose resume file (PDF, DOC, DOCX)
                    </p>
                  </div>
                </label>
                {resumeFile && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{resumeFile.name}</p>
                  </div>
                )}
                <button
                  onClick={handleUploadResume}
                  disabled={loading || !resumeFile}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#34aeeb] text-white font-semibold rounded-xl hover:bg-[#279ed8] focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                >
                  {activeAction === 'uploadResume' && loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Uploading Resume...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload Resume
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;