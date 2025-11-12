import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../redux/hooks/useJobs";
import toast from "react-hot-toast";

const PostJob = () => {
  const navigate = useNavigate();
  const { postJob, loading, error, message } = useJobs();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillRequired: [],
    salary: "",
    experience: "",
    location: "",
    jobType: "Full-time",
    position: "",
  });

  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (message) {
      toast.success(message);
      navigate("/my-posted-jobs");
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skillRequired.includes(newSkill.trim())) {
      setFormData({ 
        ...formData, 
        skillRequired: [...formData.skillRequired, newSkill.trim()] 
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setFormData({ 
      ...formData, 
      skillRequired: formData.skillRequired.filter((_, i) => i !== index) 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.skillRequired.length === 0) {
      toast.error("Please add at least one skill requirement");
      return;
    }

    const jobData = {
      ...formData,
      salary: Number(formData.salary),
      experience: Number(formData.experience),
      position: Number(formData.position),
    };

    await postJob(jobData);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Post a New Job</h1>
          <p className="text-gray-600 dark:text-gray-400">Fill in the details below to post your job opening</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                  placeholder="e.g., Senior Software Engineer" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location *</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                  placeholder="e.g., San Francisco, CA" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Type *</label>
                <select name="jobType" value={formData.jobType} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" required>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience Required (years) *</label>
                <input type="number" name="experience" value={formData.experience} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                  placeholder="e.g., 3" min="0" max="50" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Salary (Annual) *</label>
                <input type="number" name="salary" value={formData.salary} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                  placeholder="e.g., 75000" min="0" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Positions *</label>
                <input type="number" name="position" value={formData.position} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                  placeholder="e.g., 2" min="1" required />
              </div>
            </div>
          </div>



          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Job Description</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={8} 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                placeholder="Describe the job role, responsibilities, and what makes it exciting..." required />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Skills Required</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add Skill *</label>
                <div className="flex space-x-2">
                  <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} 
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                    placeholder="e.g., React, Node.js, Python" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} />
                  <button type="button" onClick={addSkill} 
                    className="px-4 py-2 bg-[#34aeeb] hover:bg-[#2a8bc7] text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer">Add</button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skillRequired.map((skill, index) => (
                  <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                    <span>{skill}</span>
                    <button type="button" onClick={() => removeSkill(index)} className="text-red-500 hover:text-red-700 cursor-pointer">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>







          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate("/my-posted-jobs")} 
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors duration-200 cursor-pointer">Cancel</button>
            <button type="submit" disabled={loading}
              className="px-6 py-2 bg-[#34aeeb] hover:bg-[#2a8bc7] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer">
              {loading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;