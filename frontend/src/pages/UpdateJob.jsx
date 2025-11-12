import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../redux/hooks/useJobs';

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentJob, loading, error, fetchJobById, updateJob } = useJobs();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillRequired: [],
    salary: '',
    experience: '',
    location: '',
    jobType: '',
    position: ''
  });

  useEffect(() => {
    fetchJobById(id);
  }, [id, fetchJobById]);

  useEffect(() => {
    if (currentJob) {
      setFormData({
        title: currentJob.title || '',
        description: currentJob.description || '',
        skillRequired: currentJob.skillRequired || [],
        salary: currentJob.salary || '',
        experience: currentJob.experience || '',
        location: currentJob.location || '',
        jobType: currentJob.jobType || '',
        position: currentJob.position || ''
      });
    }
  }, [currentJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({
      ...prev,
      skillRequired: skills
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateJob(id, formData);
    navigate('/my-posted-jobs');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#34aeeb] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading job...</p>
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
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Update Job</h1>
          <p className="text-gray-400 mt-2">Update your job posting details</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Skills Required (comma-separated)</label>
            <input
              type="text"
              value={formData.skillRequired.join(', ')}
              onChange={handleSkillsChange}
              required
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                min="0"
                max="50"
                className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Positions</label>
              <input
                type="number"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#34aeeb] hover:bg-[#2a8bc7] text-white rounded-lg font-medium transition-colors cursor-pointer"
            >
              Update Job
            </button>
            <button
              type="button"
              onClick={() => navigate('/my-posted-jobs')}
              className="px-6 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;