import React from "react";
import { Link } from "react-router-dom";

const ApplicationCard = ({ application }) => {
  const {
    id,
    jobTitle,
    company,
    appliedDate,
    status,
    coverLetter,
    resume,
    jobId,
    logo,
  } = application;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "reviewing":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
      case "interview":
        return "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200";
      case "accepted":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "rejected":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
    }
  };

  const formatDate = (date) => {
    const applied = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - applied);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return applied.toLocaleDateString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {/* Company Logo and Job Info */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              {logo ? (
                <img src={logo} alt={company} className="w-8 h-8 object-contain" />
              ) : (
                <span className="text-gray-500 dark:text-gray-400 font-bold text-lg">
                  {company?.charAt(0)?.toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {jobTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">{company}</p>
            </div>
          </div>

          {/* Status Badge */}
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        {/* Application Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Applied:</span>
            <span className="text-gray-700 dark:text-gray-300 ml-2 font-medium">
              {formatDate(appliedDate)}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Application ID:</span>
            <span className="text-gray-700 dark:text-gray-300 ml-2 font-mono text-xs">
              #{id?.slice(-8)}
            </span>
          </div>
        </div>

        {/* Cover Letter Preview */}
        {coverLetter && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Cover Letter:
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              {coverLetter}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-3">
            <Link
              to={`/jobs/${jobId}`}
              className="text-[#34aeeb] hover:text-[#2a8bc7] text-sm font-medium transition-colors duration-200"
            >
              View Job →
            </Link>
            {resume && (
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-[#34aeeb] text-sm font-medium transition-colors duration-200"
              >
                View Resume
              </a>
            )}
          </div>

          <div className="flex space-x-2">
            <button className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:text-[#34aeeb] text-sm transition-colors duration-200 cursor-pointer">
              Withdraw
            </button>
            <button className="px-3 py-1 bg-[#34aeeb] hover:bg-[#2a8bc7] text-white rounded text-sm font-medium transition-colors duration-200 cursor-pointer">
              Update
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span>Application Progress</span>
            <span>{status}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-[#34aeeb] h-2 rounded-full transition-all duration-300"
              style={{
                width: `${getProgressPercentage(status)}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getProgressPercentage = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return 25;
    case "reviewing":
      return 50;
    case "interview":
      return 75;
    case "accepted":
      return 100;
    case "rejected":
      return 100;
    default:
      return 0;
  }
};

export default ApplicationCard;