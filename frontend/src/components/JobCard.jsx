import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const {
    id,
    title,
    company,
    location,
    type,
    salary,
    description,
    requirements,
    postedDate,
    logo,
    featured = false,
    remote = false,
  } = job;

  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    if (salary.min && salary.max) {
      return `$${(salary.min / 1000).toFixed(0)}k - $${(salary.max / 1000).toFixed(0)}k`;
    }
    return salary;
  };

  const formatDate = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 ${
        featured ? "border-l-4 border-l-[#34aeeb]" : ""
      }`}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Company Logo and Info */}
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
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">{company}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col items-end space-y-2">
            {featured && (
              <span className="bg-[#34aeeb] text-white text-xs px-2 py-1 rounded-full font-medium">
                Featured
              </span>
            )}
            {remote && (
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full font-medium">
                Remote
              </span>
            )}
          </div>
        </div>

        {/* Job Details */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <span>📍</span>
            <span>{location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>💼</span>
            <span>{type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>💰</span>
            <span>{formatSalary(salary)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🕒</span>
            <span>{formatDate(postedDate)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Requirements */}
        {requirements && requirements.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Key Requirements:
            </h4>
            <div className="flex flex-wrap gap-2">
              {requirements.slice(0, 3).map((req, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                >
                  {req}
                </span>
              ))}
              {requirements.length > 3 && (
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                  +{requirements.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Link
            to={`/jobs/${id}`}
            className="text-[#34aeeb] hover:text-[#2a8bc7] font-medium text-sm transition-colors duration-200"
          >
            View Details →
          </Link>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium transition-colors duration-200 cursor-pointer">
              Save
            </button>
            <button className="px-4 py-2 bg-[#34aeeb] hover:bg-[#2a8bc7] text-white rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;