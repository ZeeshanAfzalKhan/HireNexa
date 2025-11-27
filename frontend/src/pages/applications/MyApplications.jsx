import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAppliedJobs, selectAppliedJobs, selectApplicationLoading, selectApplicationError } from '../../redux/slices/applicationSlice';
import { FileText, Eye, Download, MapPin, Calendar, Building2, Search, CheckCircle, Clock, XCircle } from 'lucide-react';

const MyApplications = () => {
  const dispatch = useDispatch();
  const applications = useSelector(selectAppliedJobs);
  const loading = useSelector(selectApplicationLoading);
  const error = useSelector(selectApplicationError);
  const totalApplications = useSelector((state) => state.application.totalApplications);
  const totalPages = useSelector((state) => state.application.totalPages);
  const currentPage = useSelector((state) => state.application.currentPage);

  useEffect(() => {
    dispatch(getAppliedJobs({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(getAppliedJobs({ page: newPage, limit: 10 }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#34aeeb] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-600 dark:text-red-400">{error}</p>
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
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Applications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Track your job applications and their status</p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-[#34aeeb] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Search className="w-6 h-6" />
                Start Your Journey
              </h2>
              <p className="text-blue-100 mt-2">Apply to jobs to see them here</p>
            </div>
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No applications yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Start applying to jobs to track your progress here</p>
              <Link
                to="/jobs"
                className="inline-block px-8 py-3 bg-[#34aeeb] hover:bg-[#279ed8] text-white rounded-xl font-semibold transition-all transform hover:scale-[1.02] cursor-pointer"
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {applications.map((application) => (
                <div key={application._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all">
                  <div className="p-8">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {application.job?.title || 'Job Title'}
                          </h3>
                          <span className={`px-3 py-1 text-sm font-medium rounded-xl border ${
                            application.status === 'accepted' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 border-green-200 dark:border-green-800' :
                            application.status === 'rejected' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 border-red-200 dark:border-red-800' :
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800'
                          }`}>
                            {application.status === 'accepted' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                            {application.status === 'rejected' && <XCircle className="w-3 h-3 inline mr-1" />}
                            {application.status === 'pending' && <Clock className="w-3 h-3 inline mr-1" />}
                            {application.status?.charAt(0).toUpperCase() + application.status?.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                          <Building2 className="w-4 h-4" />
                          <span className="font-medium">{application.job?.company?.name || 'Company'}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span>{application.job?.location || 'Location'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                              {application.job?.jobType || 'Job Type'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <Calendar className="w-4 h-4" />
                            <span>Applied {new Date(application.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        {application.coverLetter && (
                          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Letter:</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">{application.coverLetter}</p>
                          </div>
                        )}
                      </div>
                      <div className="ml-8 flex flex-col gap-3">
                        <Link
                          to={`/jobs/${application.job?._id}`}
                          className="flex items-center gap-2 px-6 py-3 bg-[#34aeeb] hover:bg-[#279ed8] text-white rounded-xl text-sm font-medium transition-all transform hover:scale-[1.02] cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          View Job
                        </Link>
                        {application.resume?.resumeURL ? (
                          <a
                            href={application.resume.resumeURL}
                            download={application.resume.resumeOriginalName || 'resume.pdf'}
                            className="flex items-center gap-2 px-6 py-3 border-2 border-[#34aeeb] text-[#34aeeb] hover:bg-[#34aeeb] hover:text-white rounded-xl text-sm font-medium transition-all transform hover:scale-[1.02] cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            Resume
                          </a>
                        ) : (
                          <span className="px-6 py-3 text-gray-500 dark:text-gray-400 text-sm text-center">No resume</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700 cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
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

export default MyApplications;