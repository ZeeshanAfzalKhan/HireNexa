import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
    experience: '',
  });

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockJobs = [
      {
        id: 1,
        title: 'Senior React Developer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        salary: '$120,000 - $150,000',
        jobType: 'Full-time',
        experience: '5+ years',
        description: 'We are looking for a senior React developer to join our team...',
        skills: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
        postedDate: '2024-01-15',
      },
      {
        id: 2,
        title: 'Frontend Engineer',
        company: 'StartupXYZ',
        location: 'Remote',
        salary: '$90,000 - $120,000',
        jobType: 'Full-time',
        experience: '3+ years',
        description: 'Join our growing frontend team and help build amazing user experiences...',
        skills: ['React', 'Vue.js', 'CSS', 'HTML'],
        postedDate: '2024-01-14',
      },
      {
        id: 3,
        title: 'Full Stack Developer',
        company: 'BigTech Inc',
        location: 'New York, NY',
        salary: '$100,000 - $140,000',
        jobType: 'Full-time',
        experience: '4+ years',
        description: 'We need a full stack developer who can work on both frontend and backend...',
        skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
        postedDate: '2024-01-13',
      },
    ];

    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      (filters.jobType === '' || job.jobType === filters.jobType) &&
      (filters.experience === '' || job.experience === filters.experience)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#34aeeb] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
          <p className="text-gray-600">
            Discover opportunities that match your skills and career goals.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { name: 'search', label: 'Search Jobs', placeholder: 'Job title, company...' },
              { name: 'location', label: 'Location', placeholder: 'City, state...' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={filters[field.name]}
                  onChange={handleFilterChange}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <select
                name="experience"
                value={filters.experience}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
              >
                <option value="">All Levels</option>
                <option value="0-1 years">0-1 years</option>
                <option value="2-3 years">2-3 years</option>
                <option value="4-5 years">4-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6 flex justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <span className="px-3 py-1 bg-[#34aeeb] text-white text-sm rounded-full">
                        {job.jobType}
                      </span>
                    </div>
                    <p className="text-lg text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span>{job.location}</span>
                      <span>{job.salary}</span>
                      <span>{job.experience}</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="ml-6 flex flex-col space-y-2">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="bg-[#34aeeb] hover:bg-[#2a8bc7] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-center"
                    >
                      View Details
                    </Link>
                    <button className="border border-[#34aeeb] text-[#34aeeb] hover:bg-[#34aeeb] hover:text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                      Quick Apply
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
