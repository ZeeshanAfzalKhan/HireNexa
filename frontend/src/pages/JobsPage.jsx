import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useJobs } from '../redux/hooks/useJobs';
import { fetchAllJobs } from '../redux/slices/jobsSlice';

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
    
    console.log('Searching with params:', params);
    dispatch(fetchAllJobs(params));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Validate numeric inputs
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#34aeeb] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Find Your Dream Job</h1>
          <p className="text-gray-300">
            Discover opportunities that match your skills and career goals.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              name="keyword"
              value={filters.keyword}
              onChange={handleFilterChange}
              placeholder="Search jobs, keywords..."
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
            />
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Location"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
            />
            <select
              name="jobType"
              value={filters.jobType}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <input
              type="number"
              name="maxSalary"
              value={filters.maxSalary}
              onChange={handleFilterChange}
              placeholder="Max Salary"
              min="0"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <input
              type="number"
              name="minExperience"
              value={filters.minExperience}
              onChange={handleFilterChange}
              placeholder="Min Experience (years)"
              min="0"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <input
              type="number"
              name="maxExperience"
              value={filters.maxExperience}
              onChange={handleFilterChange}
              placeholder="Max Experience (years)"
              min="0"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {isMaxLessThanMin && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-sm md:text-base flex items-center gap-2">
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
              className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
            >
              <option value="createdAt">Sort by Date</option>
              <option value="salary">Sort by Salary</option>
              <option value="experience">Sort by Experience</option>
            </select>
            <select
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
            <button
              onClick={handleSearch}
              disabled={isMaxLessThanMin}
              className="px-6 py-2 bg-[#34aeeb] hover:bg-[#2a8bc7] text-white rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Search
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-4 text-gray-300">
          <p>Showing {jobs.length} of {totalJobs} jobs</p>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No jobs found</h3>
              <p className="text-gray-300">Try adjusting your search criteria.</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6 flex justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                      <span className="px-3 py-1 bg-[#34aeeb] text-white text-sm rounded-full">
                        {job.jobType}
                      </span>
                    </div>
                    <p className="text-gray-300 text-lg mb-2">{job.company?.name || 'Company'}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                      <span>{job.location}</span>
                      <span>${job.salary?.toLocaleString() || 'N/A'}</span>
                      <span>{job.experience} years</span>
                    </div>
                    <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skillRequired?.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="ml-6 flex flex-col space-y-2">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="bg-[#34aeeb] hover:bg-[#2a8bc7] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-center"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => navigate(`/apply/${job._id}`)}
                      className="border border-[#34aeeb] text-[#34aeeb] hover:bg-[#34aeeb] hover:text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Quick Apply
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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


