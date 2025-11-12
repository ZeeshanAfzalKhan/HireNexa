import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../redux/hooks/useJobs';

const MyPostedJobs = () => {
  const navigate = useNavigate();
  const { adminJobs, loading, error, fetchAdminJobs } = useJobs();

  useEffect(() => {
    fetchAdminJobs();
  }, []);

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
              className="px-6 py-2 bg-[#34aeeb] text-white rounded-lg hover:bg-[#2a8bc7]"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
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
                  </div>
                  <button
                    onClick={() => handleViewApplications(job._id)}
                    className="px-4 py-2 bg-[#34aeeb] text-white rounded-lg hover:bg-[#2a8bc7] transition"
                  >
                    View Applications
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPostedJobs;