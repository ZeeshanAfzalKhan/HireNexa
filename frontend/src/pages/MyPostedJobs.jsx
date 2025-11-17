import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../redux/hooks/useJobs';
import { Briefcase, Eye, Edit3, ToggleLeft, ToggleRight, Plus, MapPin, DollarSign, Calendar, Users } from 'lucide-react';

const MyPostedJobs = () => {
  const navigate = useNavigate();
  const { adminJobs, loading, error, fetchAdminJobs, adminTotalPages, adminCurrentPage, toggleJobStatus } = useJobs();

  useEffect(() => {
    fetchAdminJobs({ page: 1, limit: 10 });
  }, [fetchAdminJobs]);

  const handlePageChange = (newPage) => {
    fetchAdminJobs({ page: newPage, limit: 10 });
  };

  const handleToggleStatus = async (jobId) => {
    await toggleJobStatus(jobId);
    fetchAdminJobs({ page: adminCurrentPage, limit: 10 });
  };

  const handleViewApplications = (jobId) => {
    navigate(`/applications/${jobId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#34aeeb] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#34aeeb] rounded-2xl mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Posted Jobs
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Manage and track your job postings</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            {error}
          </div>
        )}

        {!adminJobs || adminJobs.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-[#34aeeb] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Plus className="w-6 h-6" />
                Get Started
              </h2>
              <p className="text-blue-100 mt-2">Post your first job to start hiring</p>
            </div>
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No jobs posted yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Create your first job posting to start attracting candidates</p>
              <button
                onClick={() => navigate('/post-job')}
                className="px-8 py-3 bg-[#34aeeb] text-white rounded-xl hover:bg-[#279ed8] font-semibold transition-all transform hover:scale-[1.02] cursor-pointer"
              >
                Post Your First Job
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {adminJobs.map((job) => (
                <div key={job._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{job.title}</h2>
                          <span className={`px-3 py-1 rounded-xl text-sm font-medium ${
                            job.isClosed 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 border border-red-200 dark:border-red-800'
                              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 border border-green-200 dark:border-green-800'
                          }`}>
                            {job.isClosed ? 'Closed' : 'Open'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <DollarSign className="w-4 h-4" />
                            <span>${job.salary.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <Users className="w-4 h-4" />
                            <span>{job.position} position{job.position > 1 ? 's' : ''}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <Calendar className="w-4 h-4" />
                          <span>Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.skillRequired && job.skillRequired.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 rounded-xl text-sm font-medium border border-blue-200 dark:border-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skillRequired && job.skillRequired.length > 4 && (
                        <span className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-600">
                          +{job.skillRequired.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleViewApplications(job._id)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#34aeeb] text-white rounded-xl hover:bg-[#279ed8] transition-all transform hover:scale-[1.02] cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        View Applications
                      </button>
                      <button
                        onClick={() => navigate(`/update-job/${job._id}`)}
                        className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all transform hover:scale-[1.02] cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleStatus(job._id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all transform hover:scale-[1.02] cursor-pointer ${
                          job.isClosed 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                      >
                        {job.isClosed ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        {job.isClosed ? 'Reopen' : 'Close'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {adminTotalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(adminCurrentPage - 1)}
                  disabled={adminCurrentPage === 1}
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700 cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  Page {adminCurrentPage} of {adminTotalPages}
                </span>
                <button
                  onClick={() => handlePageChange(adminCurrentPage + 1)}
                  disabled={adminCurrentPage === adminTotalPages}
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyPostedJobs;