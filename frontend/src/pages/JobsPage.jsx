import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useJobs } from '../redux/hooks/useJobs';
import { fetchAllJobs } from '../redux/slices/jobsSlice';
import { Search, MapPin, DollarSign, Clock, Building2, Filter } from 'lucide-react';

const JobsPage = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error, totalJobs, totalPages, currentPage } = useJobs();
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    jobType: '',
    skills: '',
    minSalary: '',
    maxSalary: '',
    minExperience: '',
    maxExperience: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    limit: 10,
  });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllJobs({
      sortBy: 'createdAt',
      sortOrder: 'desc',
      page: 1,
      limit: 10,
    }));
  }, [dispatch]);

  const handleSearch = () => {
    const params = {
      sortBy: filters.sortBy || 'createdAt',
      sortOrder: filters.sortOrder || 'desc',
      page: filters.page || 1,
      limit: filters.limit || 10,
    };
    if (filters.keyword && filters.keyword.trim()) params.keyword = filters.keyword.trim();
    if (filters.location && filters.location.trim()) params.location = filters.location.trim();
    if (filters.jobType && filters.jobType.trim()) params.jobType = filters.jobType.trim();
    if (filters.skills && filters.skills.trim()) params.skills = filters.skills.trim();
    if (filters.minSalary && filters.minSalary !== '') params.minSalary = parseInt(filters.minSalary);
    if (filters.maxSalary && filters.maxSalary !== '') params.maxSalary = parseInt(filters.maxSalary);
    if (filters.minExperience && filters.minExperience !== '') params.minExperience = parseInt(filters.minExperience);
    if (filters.maxExperience && filters.maxExperience !== '') params.maxExperience = parseInt(filters.maxExperience);
    
    dispatch(fetchAllJobs(params));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (['minSalary', 'maxSalary', 'minExperience', 'maxExperience'].includes(name)) {
      if (value && parseInt(value) < 0) {
        newValue = '0';
      }
    }

    setFilters({
      ...filters,
      [name]: newValue,
      page: 1,
    });
  };

  const isMaxLessThanMin = (filters.maxSalary && filters.minSalary && parseInt(filters.maxSalary) < parseInt(filters.minSalary)) ||
                           (filters.maxExperience && filters.minExperience && parseInt(filters.maxExperience) < parseInt(filters.minExperience));

  const handlePageChange = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    
    const params = {
      sortBy: newFilters.sortBy || 'createdAt',
      sortOrder: newFilters.sortOrder || 'desc',
      page: newPage,
      limit: newFilters.limit || 10,
    };
    if (newFilters.keyword && newFilters.keyword.trim()) params.keyword = newFilters.keyword.trim();
    if (newFilters.location && newFilters.location.trim()) params.location = newFilters.location.trim();
    if (newFilters.jobType && newFilters.jobType.trim()) params.jobType = newFilters.jobType.trim();
    if (newFilters.skills && newFilters.skills.trim()) params.skills = newFilters.skills.trim();
    if (newFilters.minSalary && newFilters.minSalary !== '') params.minSalary = parseInt(newFilters.minSalary);
    if (newFilters.maxSalary && newFilters.maxSalary !== '') params.maxSalary = parseInt(newFilters.maxSalary);
    if (newFilters.minExperience && newFilters.minExperience !== '') params.minExperience = parseInt(newFilters.minExperience);
    if (newFilters.maxExperience && newFilters.maxExperience !== '') params.maxExperience = parseInt(newFilters.maxExperience);
    
    dispatch(fetchAllJobs(params));
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">✕</span>
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
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discover opportunities that match your skills and career goals
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-[#34aeeb] px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Filter className="w-6 h-6" />
              Search & Filter Jobs
            </h2>
            <p className="text-blue-100 mt-2">Find the perfect job that matches your criteria</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              <input
                type="text"
                name="keyword"
                value={filters.keyword}
                onChange={handleFilterChange}
                placeholder="Search jobs, keywords..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
              />
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Location"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
              />
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              <input
                type="text"
                name="skills"
                value={filters.skills}
                onChange={handleFilterChange}
                placeholder="Skills (comma-separated)"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <input
                type="number"
                name="minSalary"
                value={filters.minSalary}
                onChange={handleFilterChange}
                placeholder="Min Salary"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <input
                type="number"
                name="maxSalary"
                value={filters.maxSalary}
                onChange={handleFilterChange}
                placeholder="Max Salary"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <input
                type="number"
                name="minExperience"
                value={filters.minExperience}
                onChange={handleFilterChange}
                placeholder="Min Experience (years)"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <input
                type="number"
                name="maxExperience"
                value={filters.maxExperience}
                onChange={handleFilterChange}
                placeholder="Max Experience (years)"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {isMaxLessThanMin && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm md:text-base flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>Maximum value cannot be less than minimum value</span>
              </div>
            )}

            <div className="flex gap-4">
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
              >
                <option value="createdAt">Sort by Date</option>
                <option value="salary">Sort by Salary</option>
                <option value="experience">Sort by Experience</option>
              </select>
              <select
                name="sortOrder"
                value={filters.sortOrder}
                onChange={handleFilterChange}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
              <button
                onClick={handleSearch}
                disabled={isMaxLessThanMin}
                className="px-8 py-3 bg-[#34aeeb] hover:bg-[#279ed8] text-white rounded-xl font-semibold transition-all transform hover:scale-[1.02] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">Showing <span className="font-semibold text-[#34aeeb]">{jobs.length}</span> of <span className="font-semibold text-[#34aeeb]">{totalJobs}</span> jobs</p>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No jobs found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria to find more opportunities.</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                        <span className="px-3 py-1 bg-[#34aeeb] text-white text-sm font-medium rounded-xl">
                          {job.jobType}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{job.company?.name || 'Company'}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <DollarSign className="w-4 h-4" />
                          <span>${job.salary?.toLocaleString() || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <Clock className="w-4 h-4" />
                          <span>{job.experience} years exp</span>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skillRequired?.slice(0, 4).map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 text-sm font-medium rounded-xl border border-blue-200 dark:border-blue-800"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skillRequired?.length > 4 && (
                          <span className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-xl border border-gray-200 dark:border-gray-600">
                            +{job.skillRequired.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="ml-8 flex flex-col gap-3">
                      <Link
                        to={`/jobs/${job._id}`}
                        className="bg-[#34aeeb] hover:bg-[#279ed8] text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-[1.02] text-center"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => navigate(`/apply/${job._id}`)}
                        className="border-2 border-[#34aeeb] text-[#34aeeb] hover:bg-[#34aeeb] hover:text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-[1.02] cursor-pointer"
                      >
                        Quick Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
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
      </div>
    </div>
  );
};

export default JobsPage;