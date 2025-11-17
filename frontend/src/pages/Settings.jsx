import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useProfile } from '../redux/hooks/useProfile';
import { useCompany } from '../redux/hooks/useCompany';
import { useAuth } from '../redux/hooks/useAuth';
import { clearError as clearProfileError, clearMessage as clearProfileMessage } from '../redux/slices/profileSlice';
import { clearError as clearCompanyError, clearMessage as clearCompanyMessage } from '../redux/slices/companySlice';
import { Settings as SettingsIcon, User, Shield, Bell, Lock, Upload, Edit3, Trash2 } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'account':
        return <AccountSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#34aeeb] rounded-2xl mb-4">
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Manage your account preferences and settings</p>
        </div>
        
        <div className="lg:flex lg:space-x-8">
          {/* Tabs */}
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-[#34aeeb] px-6 py-4">
                <h2 className="text-lg font-bold text-white">Navigation</h2>
              </div>
              <nav className="p-4 space-y-2">
                <button onClick={() => setActiveTab('profile')} className={`w-full text-left px-4 py-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${activeTab === 'profile' ? 'bg-[#34aeeb] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button onClick={() => setActiveTab('account')} className={`w-full text-left px-4 py-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${activeTab === 'account' ? 'bg-[#34aeeb] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                  <Shield className="w-4 h-4" />
                  Account
                </button>
                <button onClick={() => setActiveTab('notifications')} className={`w-full text-left px-4 py-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${activeTab === 'notifications' ? 'bg-[#34aeeb] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                  <Bell className="w-4 h-4" />
                  Notifications
                </button>
                <button onClick={() => setActiveTab('privacy')} className={`w-full text-left px-4 py-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${activeTab === 'privacy' ? 'bg-[#34aeeb] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                  <Lock className="w-4 h-4" />
                  Privacy
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { profile, loading, error, message, getProfile, updateProfile, uploadProfilePicture } = useProfile();
  const [form, setForm] = useState({ firstName: '', lastName: '', emailId: '', phoneNumber: '', linkedIn: '', github: '', website: '' });
  const [avatarFile, setAvatarFile] = useState(null);

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
        linkedIn: profile.profile?.socials?.linkedIn || '',
        github: profile.profile?.socials?.github || '',
        website: profile.profile?.socials?.website || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => dispatch(clearProfileMessage()), 3000);
      return () => clearTimeout(t);
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => dispatch(clearProfileError()), 4000);
      return () => clearTimeout(t);
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNumber: form.phoneNumber,
      profile: { 
        socials: {
          linkedIn: form.linkedIn,
          github: form.github,
          website: form.website,
        }
      },
    });
  };

  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;
    await uploadProfilePicture(avatarFile);
    setAvatarFile(null);
  };

  const avatarUrl = profile?.profile?.profilePicture?.profilePictureURL;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-[#34aeeb] px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <User className="w-6 h-6" />
          Profile Settings
        </h2>
        <p className="text-blue-100 mt-2">Update your personal information and social links</p>
      </div>
      
      <div className="p-8">
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

        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center space-x-6">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#34aeeb] flex items-center justify-center text-white text-2xl font-bold border-4 border-gray-200 dark:border-gray-600">
                {(form.firstName || 'U').charAt(0).toUpperCase()}
              </div>
            )}
            <div className="space-y-2">
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarSelect}
              />
              <div className="flex gap-2">
                <label htmlFor="avatar-input" className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-all">
                  <Upload className="w-4 h-4" />
                  Choose Avatar
                </label>
                <button type="button" onClick={handleAvatarUpload} disabled={loading || !avatarFile} className="flex items-center gap-2 px-4 py-2 bg-[#34aeeb] text-white rounded-xl hover:bg-[#279ed8] disabled:opacity-60 disabled:cursor-not-allowed transition-all">
                  {loading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
              {avatarFile && <p className="text-sm text-gray-500 dark:text-gray-400">{avatarFile.name}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">First Name</label>
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Last Name</label>
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
              <input type="email" name="emailId" value={form.emailId} disabled className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white opacity-60" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number</label>
              <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all" placeholder="1234567890" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">LinkedIn</label>
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
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">GitHub</label>
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
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Website</label>
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
          
          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="flex items-center gap-2 px-8 py-3 bg-[#34aeeb] text-white font-semibold rounded-xl hover:bg-[#279ed8] focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
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
  );
};

const AccountSettings = () => {
  const dispatch = useDispatch();
  const { changePassword, loading: profileLoading, error: profileError, message: profileMessage } = useProfile();
  const { user } = useAuth();
  const { company, getCompany, deleteCompany, loading: companyLoading, error: companyError, message: companyMessage } = useCompany();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (user?.role === "recruitor") {
      getCompany();
    }
  }, [user, getCompany]);

  useEffect(() => {
    if (profileMessage) {
      const t = setTimeout(() => dispatch(clearProfileMessage()), 3000);
      return () => clearTimeout(t);
    }
  }, [profileMessage, dispatch]);

  useEffect(() => {
    if (profileError) {
      const t = setTimeout(() => dispatch(clearProfileError()), 4000);
      return () => clearTimeout(t);
    }
  }, [profileError, dispatch]);

  useEffect(() => {
    if (companyMessage) {
      const t = setTimeout(() => dispatch(clearCompanyMessage()), 3000);
      return () => clearTimeout(t);
    }
  }, [companyMessage, dispatch]);

  useEffect(() => {
    if (companyError) {
      const t = setTimeout(() => dispatch(clearCompanyError()), 4000);
      return () => clearTimeout(t);
    }
  }, [companyError, dispatch]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (newPassword !== confirmPassword) {
      setLocalError("New passwords do not match");
      return;
    }
    await changePassword({ currentPassword, newPassword });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteCompany = async () => {
    if (!company?._id) return;
    const ok = window.confirm("Are you sure you want to delete your company?");
    if (!ok) return;
    await deleteCompany(company._id);
  };

  return (
    <div className="space-y-8">
      {/* Change Password Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-[#34aeeb] px-8 py-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Shield className="w-6 h-6" />
            Change Password
          </h2>
          <p className="text-blue-100 mt-2">Update your account password for security</p>
        </div>
        
        <div className="p-8">
          {localError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              {localError}
            </div>
          )}
          {profileError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              {profileError}
            </div>
          )}
          {profileMessage && (
            <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300 flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              {profileMessage}
            </div>
          )}
          
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={profileLoading}
                className="flex items-center gap-2 px-8 py-3 bg-[#34aeeb] text-white font-semibold rounded-xl hover:bg-[#279ed8] focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {profileLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Update Password
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Company Management Card */}
      {user?.role === 'recruitor' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-red-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Trash2 className="w-6 h-6" />
              Company Management
            </h2>
            <p className="text-red-100 mt-2">Manage your company registration</p>
          </div>
          
          <div className="p-8">
            {companyError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                {companyError}
              </div>
            )}
            {companyMessage && (
              <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300 flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {companyMessage}
              </div>
            )}
            
            {company ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Company:</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{company.name}</p>
                </div>
                <button
                  onClick={handleDeleteCompany}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={companyLoading}
                >
                  {companyLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      Delete Company
                    </>
                  )}
                </button>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No company registered.</p>
            )}
          </div>
        </div>
      )}

      {/* Delete Account Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-red-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Trash2 className="w-6 h-6" />
            Danger Zone
          </h2>
          <p className="text-red-100 mt-2">Permanently delete your account and all data</p>
        </div>
        
        <div className="p-8">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all transform hover:scale-[1.02]">
              <Trash2 className="w-5 h-5" />
              Delete My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationSettings = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div className="bg-[#34aeeb] px-8 py-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
        <Bell className="w-6 h-6" />
        Notification Settings
      </h2>
      <p className="text-blue-100 mt-2">Manage how you receive notifications</p>
    </div>
    
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Notifications</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Receive emails about your account activity.</p>
        </div>
        <label className="switch">
          <input type="checkbox" defaultChecked />
          <span className="slider round"></span>
        </label>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Push Notifications</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Get push notifications on your mobile device.</p>
        </div>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Job Recommendations</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications for jobs that match your profile.</p>
        </div>
        <label className="switch">
          <input type="checkbox" defaultChecked />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  </div>
);

const PrivacySettings = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div className="bg-[#34aeeb] px-8 py-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
        <Lock className="w-6 h-6" />
        Privacy Settings
      </h2>
      <p className="text-blue-100 mt-2">Control your privacy and data visibility</p>
    </div>
    
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Visibility</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Control who can see your profile.</p>
        </div>
        <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent">
          <option>Public</option>
          <option>Recruiters Only</option>
          <option>Private</option>
        </select>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Search Indexing</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Allow search engines to index your profile.</p>
        </div>
        <label className="switch">
          <input type="checkbox" defaultChecked />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  </div>
);

export default Settings;

// Basic CSS for the toggle switch
const style = document.createElement('style');
style.innerHTML = `
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: #2196F3;
}
input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
`;
document.head.appendChild(style);