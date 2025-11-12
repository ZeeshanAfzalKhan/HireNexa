import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../redux/hooks/useJobs';

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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-lg">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">My Posted Jobs</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {!adminJobs || adminJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No jobs posted yet</p>
            <button
              onClick={() => navigate('/post-job')}
              className="px-6 py-2 bg-[#34aeeb] text-white rounded-lg hover:bg-[#2a8bc7] cursor-pointer"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {adminJobs.map((job) => (
              <div key={job._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{job.location}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Posted on {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                      ${job.salary.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {job.position} position{job.position > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                    {job.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skillRequired && job.skillRequired.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skillRequired && job.skillRequired.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-sm">
                      +{job.skillRequired.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{job.jobType}</span>
                    <span>•</span>
                    <span>{job.experience} years exp</span>
                    <span>•</span>
                    <span className={job.isClosed ? 'text-red-400' : 'text-green-400'}>
                      {job.isClosed ? 'Closed' : 'Open'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewApplications(job._id)}
                      className="px-4 py-2 bg-[#34aeeb] text-white rounded-lg hover:bg-[#2a8bc7] transition cursor-pointer"
                    >
                      View Applications
                    </button>
                    <button
                      onClick={() => navigate(`/update-job/${job._id}`)}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(job._id)}
                      className={`px-4 py-2 rounded-lg transition cursor-pointer ${
                        job.isClosed 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      {job.isClosed ? 'Reopen' : 'Close'}
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
            {adminTotalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(adminCurrentPage - 1)}
                  disabled={adminCurrentPage === 1}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-gray-300">
                  Page {adminCurrentPage} of {adminTotalPages}
                </span>
                <button
                  onClick={() => handlePageChange(adminCurrentPage + 1)}
                  disabled={adminCurrentPage === adminTotalPages}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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