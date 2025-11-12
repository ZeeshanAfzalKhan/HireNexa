import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAppliedJobs, selectAppliedJobs, selectApplicationLoading, selectApplicationError } from '../../redux/slices/applicationSlice';

const MyApplications = () => {
  const dispatch = useDispatch();
  const applications = useSelector(selectAppliedJobs);
  const loading = useSelector(selectApplicationLoading);
  const error = useSelector(selectApplicationError);

  useEffect(() => {
    dispatch(getAppliedJobs());
  }, [dispatch]);

  useEffect(() => {
    if (applications.length > 0) {
      console.log('Applications data:', applications);
      console.log('First application resume:', applications[0]?.resume);
    }
  }, [applications]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#34aeeb] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-2xl">✕</span>
          </div>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="text-gray-400 mt-2">Track your job applications and their status</p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-gray-800 rounded-lg shadow p-12 text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No applications yet</h3>
            <p className="text-gray-400 mb-4">Start applying to jobs to see them here</p>
            <Link
              to="/jobs"
              className="inline-block px-6 py-2 bg-[#34aeeb] hover:bg-[#2a8bc7] text-white rounded-lg font-medium transition-colors cursor-pointer"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div key={application._id} className="bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        {application.job?.title || 'Job Title'}
                      </h3>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        application.status === 'accepted' ? 'bg-green-900 text-green-300' :
                        application.status === 'rejected' ? 'bg-red-900 text-red-300' :
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {application.status?.charAt(0).toUpperCase() + application.status?.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">{application.job?.company?.name || 'Company'}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span>{application.job?.location || 'Location'}</span>
                      <span>{application.job?.jobType || 'Job Type'}</span>
                      <span>Applied: {new Date(application.createdAt).toLocaleDateString()}</span>
                    </div>
                    {application.coverLetter && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-400 mb-1">Cover Letter:</p>
                        <p className="text-gray-300 text-sm line-clamp-2">{application.coverLetter}</p>
                      </div>
                    )}
                  </div>
                  <div className="ml-6 flex flex-col gap-2">
                    <Link
                      to={`/jobs/${application.job?._id}`}
                      className="px-4 py-2 bg-[#34aeeb] hover:bg-[#2a8bc7] text-white rounded-lg text-sm font-medium transition-colors text-center cursor-pointer"
                    >
                      View Job
                    </Link>
                    {application.resume?.resumeURL ? (
                      <a
                        href={application.resume.resumeURL}
                        download={application.resume.resumeOriginalName || 'resume.pdf'}
                        className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors text-center cursor-pointer"
                      >
                        Download Resume
                      </a>
                    ) : (
                      <span className="px-4 py-2 text-gray-500 text-sm">No resume</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;