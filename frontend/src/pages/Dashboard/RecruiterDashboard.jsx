import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../redux/hooks/useJobs';
import { useAuth } from '../../redux/hooks/useAuth';
import { Briefcase, Target, DollarSign, TrendingUp, Plus, Building2, FileText, Users } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#34aeeb] rounded-2xl mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Manage your job postings and track your hiring progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Briefcase className="w-6 h-6 text-[#34aeeb]" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{adminJobs.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Open Positions</p>
                <p className="text-2xl font-bold text-green-600">{totalPositions}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Avg Salary</p>
                <p className="text-2xl font-bold text-yellow-600">${avgSalary.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-2xl font-bold text-purple-600">{adminJobs.filter(job => new Date(job.createdAt).getMonth() === new Date().getMonth()).length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Job Posts */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-[#34aeeb] px-8 py-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <FileText className="w-6 h-6" />
                  Recent Job Posts
                </h2>
                <button 
                  onClick={() => navigate('/my-posted-jobs')}
                  className="text-blue-100 hover:text-white text-sm font-medium cursor-pointer"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="p-8">
              {recentJobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No jobs posted yet</p>
                  <button 
                    onClick={() => navigate('/post-job')}
                    className="px-6 py-3 bg-[#34aeeb] text-white rounded-xl hover:bg-[#279ed8] font-semibold transition-all transform hover:scale-[1.02] cursor-pointer"
                  >
                    Post Your First Job
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job._id} className="border-l-4 border-[#34aeeb] pl-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{job.location}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-green-600 font-medium">
                          ${job.salary.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-[#34aeeb] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Plus className="w-6 h-6" />
                Quick Actions
              </h2>
              <p className="text-blue-100 mt-2">Manage your recruitment activities</p>
            </div>
            <div className="p-8 space-y-4">
              <button 
                onClick={() => navigate('/post-job')}
                className="w-full p-4 bg-[#34aeeb] text-white rounded-xl hover:bg-[#279ed8] transition-all transform hover:scale-[1.02] flex items-center cursor-pointer"
              >
                <Plus className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <p className="font-semibold">Post New Job</p>
                  <p className="text-sm opacity-90">Create a new job posting</p>
                </div>
              </button>
              <button 
                onClick={() => navigate('/company-profile')}
                className="w-full p-4 border-2 border-[#34aeeb] text-[#34aeeb] rounded-xl hover:bg-[#34aeeb] hover:text-white transition-all transform hover:scale-[1.02] flex items-center cursor-pointer"
              >
                <Building2 className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <p className="font-semibold">Company Profile</p>
                  <p className="text-sm opacity-75">Update company information</p>
                </div>
              </button>
              <button 
                onClick={() => navigate('/my-posted-jobs')}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:scale-[1.02] flex items-center cursor-pointer"
              >
                <FileText className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">Manage Jobs</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View and edit job posts</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;