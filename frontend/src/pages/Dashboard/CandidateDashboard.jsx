import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../../redux/hooks/useApplication';
import { useAuth } from '../../redux/hooks/useAuth';

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const { appliedJobs, getAppliedJobs } = useApplication();
  const { user } = useAuth();

  useEffect(() => {
    getAppliedJobs(); // Get all applications for dashboard stats
  }, [getAppliedJobs]);

  const recentApplications = appliedJobs.slice(0, 3);
  const pendingCount = appliedJobs.filter(app => app.status === 'pending').length;
  const acceptedCount = appliedJobs.filter(app => app.status === 'accepted').length;
  const rejectedCount = appliedJobs.filter(app => app.status === 'rejected').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}!</h1>
        <p className="text-gray-600 dark:text-gray-400">Here's your job search overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <span className="text-2xl">📋</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
              <p className="text-2xl font-bold">{appliedJobs.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <span className="text-2xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
              <p className="text-2xl font-bold text-green-600">{acceptedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <span className="text-2xl">❌</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            <button 
              onClick={() => navigate('/my-applications')}
              className="text-[#34aeeb] hover:underline text-sm cursor-pointer"
            >
              View All
            </button>
          </div>
          {recentApplications.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No applications yet</p>
          ) : (
            <div className="space-y-3">
              {recentApplications.map((application) => (
                <div key={application._id} className="border-l-4 border-[#34aeeb] pl-4 py-2">
                  <h3 className="font-medium">{application.job?.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{application.job?.company?.name}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      application.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      application.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/jobs')}
              className="w-full p-4 bg-[#34aeeb] text-white rounded-lg hover:bg-[#2a8bc7] transition flex items-center cursor-pointer"
            >
              <span className="text-2xl mr-3">🔍</span>
              <div className="text-left">
                <p className="font-medium">Browse Jobs</p>
                <p className="text-sm opacity-90">Find your next opportunity</p>
              </div>
            </button>
            <button 
              onClick={() => navigate('/candidate-profile')}
              className="w-full p-4 border-2 border-[#34aeeb] text-[#34aeeb] rounded-lg hover:bg-[#34aeeb] hover:text-white transition flex items-center cursor-pointer"
            >
              <span className="text-2xl mr-3">👤</span>
              <div className="text-left">
                <p className="font-medium">Update Profile</p>
                <p className="text-sm opacity-75">Keep your profile current</p>
              </div>
            </button>
            <button 
              onClick={() => navigate('/my-applications')}
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center cursor-pointer"
            >
              <span className="text-2xl mr-3">📄</span>
              <div className="text-left">
                <p className="font-medium">View Applications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Track your applications</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;