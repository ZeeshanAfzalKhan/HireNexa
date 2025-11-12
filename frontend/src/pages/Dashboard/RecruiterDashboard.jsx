import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../redux/hooks/useJobs';
import { useAuth } from '../../redux/hooks/useAuth';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const { adminJobs, fetchAdminJobs } = useJobs();
  const { user } = useAuth();

  useEffect(() => {
    fetchAdminJobs(); // Get all jobs for dashboard stats
  }, [fetchAdminJobs]);

  const recentJobs = adminJobs.slice(0, 3);
  const totalPositions = adminJobs.reduce((sum, job) => sum + job.position, 0);
  const avgSalary = adminJobs.length > 0 ? Math.round(adminJobs.reduce((sum, job) => sum + job.salary, 0) / adminJobs.length) : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}!</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your job postings and applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <span className="text-2xl">💼</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Jobs</p>
              <p className="text-2xl font-bold">{adminJobs.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Open Positions</p>
              <p className="text-2xl font-bold text-green-600">{totalPositions}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Salary</p>
              <p className="text-2xl font-bold text-yellow-600">${avgSalary.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <span className="text-2xl">📈</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-purple-600">{adminJobs.filter(job => new Date(job.createdAt).getMonth() === new Date().getMonth()).length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Job Posts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Job Posts</h2>
            <button 
              onClick={() => navigate('/my-posted-jobs')}
              className="text-[#34aeeb] hover:underline text-sm cursor-pointer"
            >
              View All
            </button>
          </div>
          {recentJobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No jobs posted yet</p>
              <button 
                onClick={() => navigate('/post-job')}
                className="px-4 py-2 bg-[#34aeeb] text-white rounded-lg hover:bg-[#2a8bc7] cursor-pointer"
              >
                Post Your First Job
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentJobs.map((job) => (
                <div key={job._id} className="border-l-4 border-[#34aeeb] pl-4 py-2">
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{job.location}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-green-600 font-medium">
                      ${job.salary.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(job.createdAt).toLocaleDateString()}
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
              onClick={() => navigate('/post-job')}
              className="w-full p-4 bg-[#34aeeb] text-white rounded-lg hover:bg-[#2a8bc7] transition flex items-center cursor-pointer"
            >
              <span className="text-2xl mr-3">➕</span>
              <div className="text-left">
                <p className="font-medium">Post New Job</p>
                <p className="text-sm opacity-90">Create a new job posting</p>
              </div>
            </button>
            <button 
              onClick={() => navigate('/company-profile')}
              className="w-full p-4 border-2 border-[#34aeeb] text-[#34aeeb] rounded-lg hover:bg-[#34aeeb] hover:text-white transition flex items-center cursor-pointer"
            >
              <span className="text-2xl mr-3">🏢</span>
              <div className="text-left">
                <p className="font-medium">Company Profile</p>
                <p className="text-sm opacity-75">Update company information</p>
              </div>
            </button>
            <button 
              onClick={() => navigate('/my-posted-jobs')}
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center cursor-pointer"
            >
              <span className="text-2xl mr-3">📋</span>
              <div className="text-left">
                <p className="font-medium">Manage Jobs</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">View and edit job posts</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;