import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../redux/hooks/useJobs";
import toast from "react-hot-toast";
import { Briefcase, MapPin, DollarSign, Clock, Users, FileText, Plus, X } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#34aeeb] rounded-2xl mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Post a New Job
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Create and publish your job opening to attract top talent</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-[#34aeeb] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Briefcase className="w-6 h-6" />
                Basic Information
              </h2>
              <p className="text-blue-100 mt-2">Essential details about the job position</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Briefcase className="w-4 h-4" />
                    Job Title *
                  </label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all" 
                    placeholder="e.g., Senior Software Engineer" required />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <MapPin className="w-4 h-4" />
                    Location *
                  </label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all" 
                    placeholder="e.g., San Francisco, CA" required />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Clock className="w-4 h-4" />
                    Job Type *
                  </label>
                  <select name="jobType" value={formData.jobType} onChange={handleInputChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all" required>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Clock className="w-4 h-4" />
                    Experience Required (years) *
                  </label>
                  <input type="number" name="experience" value={formData.experience} onChange={handleInputChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all" 
                    placeholder="e.g., 3" min="0" max="50" required />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <DollarSign className="w-4 h-4" />
                    Salary (Annual) *
                  </label>
                  <input type="number" name="salary" value={formData.salary} onChange={handleInputChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all" 
                    placeholder="e.g., 75000" min="0" required />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Users className="w-4 h-4" />
                    Number of Positions *
                  </label>
                  <input type="number" name="position" value={formData.position} onChange={handleInputChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all" 
                    placeholder="e.g., 2" min="1" required />
                </div>
              </div>
            </div>
          </div>



          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-[#34aeeb] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FileText className="w-6 h-6" />
                Job Description
              </h2>
              <p className="text-blue-100 mt-2">Detailed information about the role and responsibilities</p>
            </div>
            <div className="p-8">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <FileText className="w-4 h-4" />
                  Description *
                </label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={8} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all resize-none" 
                  placeholder="Describe the job role, responsibilities, and what makes it exciting..." required />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-[#34aeeb] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Plus className="w-6 h-6" />
                Skills Required
              </h2>
              <p className="text-blue-100 mt-2">Add the technical skills and qualifications needed</p>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Plus className="w-4 h-4" />
                  Add Skill *
                </label>
                <div className="flex gap-2">
                  <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} 
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent transition-all" 
                    placeholder="e.g., React, Node.js, Python" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} />
                  <button type="button" onClick={addSkill} 
                    className="flex items-center gap-2 px-6 py-3 bg-[#34aeeb] text-white font-semibold rounded-xl hover:bg-[#279ed8] transition-all cursor-pointer">
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skillRequired.map((skill, index) => (
                  <span key={index} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-xl text-sm font-medium border border-blue-200 dark:border-blue-800">
                    <span>{skill}</span>
                    <button type="button" onClick={() => removeSkill(index)} className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>







          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => navigate("/my-posted-jobs")} 
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold transition-all cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-[#34aeeb] text-white font-semibold rounded-xl hover:bg-[#279ed8] focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none cursor-pointer">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Posting...
                </>
              ) : (
                <>
                  <Briefcase className="w-5 h-5" />
                  Post Job
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;