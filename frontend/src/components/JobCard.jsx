import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, DollarSign, Clock, Star, Wifi, Building2, ArrowRight, Bookmark } from "lucide-react";

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
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 transform hover:scale-[1.02] ${
        featured ? "ring-2 ring-[#34aeeb] ring-opacity-50" : ""
      }`}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Company Logo and Info */}
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
              {logo ? (
                <img src={logo} alt={company} className="w-8 h-8 object-contain" />
              ) : (
                <Building2 className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {company}
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col items-end space-y-2">
            {featured && (
              <span className="bg-gradient-to-r from-[#34aeeb] to-[#279ed8] text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3" />
                Featured
              </span>
            )}
            {remote && (
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 shadow-lg">
                <Wifi className="w-3 h-3" />
                Remote
              </span>
            )}
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <MapPin className="w-4 h-4 text-[#34aeeb]" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{location}</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Briefcase className="w-4 h-4 text-[#34aeeb]" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <DollarSign className="w-4 h-4 text-[#34aeeb]" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{formatSalary(salary)}</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Clock className="w-4 h-4 text-[#34aeeb]" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{formatDate(postedDate)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Requirements */}
        {requirements && requirements.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#34aeeb] rounded-full"></div>
              Key Requirements
            </h4>
            <div className="flex flex-wrap gap-2">
              {requirements.slice(0, 3).map((req, index) => (
                <span
                  key={index}
                  className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800"
                >
                  {req}
                </span>
              ))}
              {requirements.length > 3 && (
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600">
                  +{requirements.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link
            to={`/jobs/${id}`}
            className="text-[#34aeeb] hover:text-[#279ed8] font-medium text-sm transition-colors duration-200 flex items-center gap-1"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex space-x-3">
            <button className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 cursor-pointer">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-[#34aeeb] to-[#279ed8] hover:from-[#279ed8] hover:to-[#1e7bb8] text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;