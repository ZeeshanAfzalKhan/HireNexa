import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../../redux/hooks/useApplication';
import { useAuth } from '../../redux/hooks/useAuth';
import { User, Briefcase, Clock, CheckCircle, XCircle, Search, FileText, TrendingUp } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#34aeeb] rounded-2xl mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Here's your job search overview and recent activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Briefcase className="w-6 h-6 text-[#34aeeb]" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{appliedJobs.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Accepted</p>
                <p className="text-2xl font-bold text-green-600">{acceptedCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-[#34aeeb] px-8 py-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <FileText className="w-6 h-6" />
                  Recent Applications
                </h2>
                <button 
                  onClick={() => navigate('/my-applications')}
                  className="text-blue-100 hover:text-white text-sm font-medium cursor-pointer"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="p-8">
              {recentApplications.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No applications yet</p>
              ) : (
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div key={application._id} className="border-l-4 border-[#34aeeb] pl-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{application.job?.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{application.job?.company?.name}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className={`px-3 py-1 rounded-xl text-xs font-medium ${
                          application.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 border border-green-200 dark:border-green-800' :
                          application.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 border border-red-200 dark:border-red-800' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800'
                        }`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(application.createdAt).toLocaleDateString()}
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
                <Search className="w-6 h-6" />
                Quick Actions
              </h2>
              <p className="text-blue-100 mt-2">Navigate to key areas of your job search</p>
            </div>
            <div className="p-8 space-y-4">
              <button 
                onClick={() => navigate('/jobs')}
                className="w-full p-4 bg-[#34aeeb] text-white rounded-xl hover:bg-[#279ed8] transition-all transform hover:scale-[1.02] flex items-center cursor-pointer"
              >
                <Search className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <p className="font-semibold">Browse Jobs</p>
                  <p className="text-sm opacity-90">Find your next opportunity</p>
                </div>
              </button>
              <button 
                onClick={() => navigate('/candidate-profile')}
                className="w-full p-4 border-2 border-[#34aeeb] text-[#34aeeb] rounded-xl hover:bg-[#34aeeb] hover:text-white transition-all transform hover:scale-[1.02] flex items-center cursor-pointer"
              >
                <User className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <p className="font-semibold">Update Profile</p>
                  <p className="text-sm opacity-75">Keep your profile current</p>
                </div>
              </button>
              <button 
                onClick={() => navigate('/my-applications')}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:scale-[1.02] flex items-center cursor-pointer"
              >
                <FileText className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">View Applications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Track your applications</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;