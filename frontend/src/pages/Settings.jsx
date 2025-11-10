import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useProfile } from '../redux/hooks/useProfile';
import { useCompany } from '../redux/hooks/useCompany';
import { useAuth } from '../redux/hooks/useAuth';
import { clearError as clearProfileError, clearMessage as clearProfileMessage } from '../redux/slices/profileSlice';
import { clearError as clearCompanyError, clearMessage as clearCompanyMessage } from '../redux/slices/companySlice';

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <div className="lg:flex lg:space-x-8">
          {/* Tabs */}
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <nav className="flex flex-col space-y-2">
              <button onClick={() => setActiveTab('profile')} className={`text-left px-4 py-2 rounded-lg cursor-pointer ${activeTab === 'profile' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Profile</button>
              <button onClick={() => setActiveTab('account')} className={`text-left px-4 py-2 rounded-lg cursor-pointer ${activeTab === 'account' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Account</button>
              <button onClick={() => setActiveTab('notifications')} className={`text-left px-4 py-2 rounded-lg cursor-pointer ${activeTab === 'notifications' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Notifications</button>
              <button onClick={() => setActiveTab('privacy')} className={`text-left px-4 py-2 rounded-lg cursor-pointer ${activeTab === 'privacy' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Privacy</button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { profile, loading, error, message, getProfile, updateProfile, uploadProfilePicture } = useProfile();
  const [form, setForm] = useState({ firstName: '', lastName: '', emailId: '', bio: '' });
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
        bio: profile.profile?.bio || '',
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
      profile: { bio: form.bio },
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
    <div>
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

      {message && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-200">{message}</div>
      )}
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-200">{error}</div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="flex items-center space-x-4">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#34aeeb] flex items-center justify-center text-white text-2xl font-bold">
              {(form.firstName || 'U').charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarSelect}
            />
            <label htmlFor="avatar-input" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer inline-block">Choose Avatar</label>
            <button type="button" onClick={handleAvatarUpload} disabled={loading || !avatarFile} className="ml-2 px-4 py-2 bg-[#34aeeb] text-white rounded-lg hover:bg-[#2a8bc7] disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Uploading...' : 'Upload'}
            </button>
            {avatarFile && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{avatarFile.name}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="emailId" value={form.emailId} disabled className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea rows="4" name="bio" value={form.bio} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
        </div>
        <div className="text-right">
          <button type="submit" disabled={loading} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
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
    <div>
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

      {/* Change Password */}
      <div className="space-y-2 mb-6">
        <h3 className="text-lg font-semibold">Change Password</h3>
        {localError && (
          <div className="mb-2 p-3 rounded bg-red-100 text-red-700 border border-red-200">{localError}</div>
        )}
        {profileError && (
          <div className="mb-2 p-3 rounded bg-red-100 text-red-700 border border-red-200">{profileError}</div>
        )}
        {profileMessage && (
          <div className="mb-2 p-3 rounded bg-green-100 text-green-700 border border-green-200">{profileMessage}</div>
        )}
        <form onSubmit={handleChangePassword} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              required
            />
          </div>
          <div className="md:col-span-3">
            <button
                type="submit"
                disabled={profileLoading}
                className="mt-2 px-4 py-2 bg-[#34aeeb] text-white rounded-lg hover:bg-[#2a8bc7] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {profileLoading ? 'Updating...' : 'Update Password'}
              </button>
          </div>
        </form>
      </div>

      <hr className="dark:border-gray-600"/>

      {/* Recruiter Company Deletion */}
      {user?.role === 'recruitor' && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-red-500">Delete Company</h3>
          {companyError && (
            <div className="mt-2 p-3 rounded bg-red-100 text-red-700 border border-red-200">{companyError}</div>
          )}
          {companyMessage && (
            <div className="mt-2 p-3 rounded bg-green-100 text-green-700 border border-green-200">{companyMessage}</div>
          )}
          {company ? (
            <>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Company: <span className="font-medium">{company.name}</span></p>
              <button
                onClick={handleDeleteCompany}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={companyLoading}
              >
                {companyLoading ? 'Deleting...' : 'Delete Company'}
              </button>
            </>
          ) : (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">No company registered.</p>
          )}
        </div>
      )}

      {/* Delete Account (placeholder) */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-red-500">Delete Account</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Permanently delete your account and all of your content.</p>
        <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer">Delete My Account</button>
      </div>
    </div>
  );
};

const NotificationSettings = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Notification Settings</h2>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Email Notifications</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Receive emails about your account activity.</p>
        </div>
        <label className="switch">
          <input type="checkbox" defaultChecked />
          <span className="slider round"></span>
        </label>
      </div>
      <hr className="dark:border-gray-600"/>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Push Notifications</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Get push notifications on your mobile device.</p>
        </div>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
       <hr className="dark:border-gray-600"/>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Job Recommendations</h3>
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
  <div>
    <h2 className="text-2xl font-bold mb-6">Privacy Settings</h2>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Profile Visibility</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Control who can see your profile.</p>
        </div>
        <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
          <option>Public</option>
          <option>Recruiters Only</option>
          <option>Private</option>
        </select>
      </div>
      <hr className="dark:border-gray-600"/>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Search Indexing</h3>
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