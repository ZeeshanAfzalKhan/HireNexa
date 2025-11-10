import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "full-time",
    remote: false,
    salary: { min: "", max: "", currency: "USD", period: "yearly" },
    description: "",
    requirements: [],
    responsibilities: [],
    benefits: [],
    applicationDeadline: "",
    contactEmail: "",
    department: "",
    experienceLevel: "entry",
  });

  const [newRequirement, setNewRequirement] = useState("");
  const [newResponsibility, setNewResponsibility] = useState("");
  const [newBenefit, setNewBenefit] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith("salary.")) {
      const salaryField = name.split(".")[1];
      setFormData({
        ...formData,
        salary: { ...formData.salary, [salaryField]: type === "number" ? parseFloat(value) || "" : value },
      });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const addToList = (field, value, setValue) => {
    if (value.trim()) {
      setFormData({ ...formData, [field]: [...formData[field], value.trim()] });
      setValue("");
    }
  };

  const removeFromList = (field, index) => {
    setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job posting data:", formData);
    alert("Job posted successfully!");
    navigate("/jobs");
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name *</label>
                <input type="text" name="company" value={formData.company} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                  placeholder="Your company name" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location *</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                  placeholder="e.g., San Francisco, CA" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                <input type="text" name="department" value={formData.department} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                  placeholder="e.g., Engineering" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Type *</label>
                <select name="type" value={formData.type} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" required>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience Level *</label>
                <select name="experienceLevel" value={formData.experienceLevel} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" required>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="remote" checked={formData.remote} onChange={handleInputChange} className="rounded" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">This position allows remote work</span>
              </label>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Salary Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min Salary</label>
                <input type="number" name="salary.min" value={formData.salary.min} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                  placeholder="50000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Salary</label>
                <input type="number" name="salary.max" value={formData.salary.max} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                  placeholder="100000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                <select name="salary.currency" value={formData.salary.currency} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]">
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Period</label>
                <select name="salary.period" value={formData.salary.period} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]">
                  <option value="yearly">Yearly</option>
                  <option value="monthly">Monthly</option>
                  <option value="hourly">Hourly</option>
                </select>
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Requirements</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add Requirement</label>
                <div className="flex space-x-2">
                  <input type="text" value={newRequirement} onChange={(e) => setNewRequirement(e.target.value)} 
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                    placeholder="e.g., 3+ years of experience in React" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('requirements', newRequirement, setNewRequirement))} />
                  <button type="button" onClick={() => addToList("requirements", newRequirement, setNewRequirement)} 
                    className="px-4 py-2 bg-[#34aeeb] hover:bg-[#2a8bc7] text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer">Add</button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.requirements.map((req, index) => (
                  <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                    <span>{req}</span>
                    <button type="button" onClick={() => removeFromList("requirements", index)} className="text-red-500 hover:text-red-700 cursor-pointer">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Responsibilities</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add Responsibility</label>
                <div className="flex space-x-2">
                  <input type="text" value={newResponsibility} onChange={(e) => setNewResponsibility(e.target.value)} 
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                    placeholder="e.g., Design and implement user interfaces" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('responsibilities', newResponsibility, setNewResponsibility))} />
                  <button type="button" onClick={() => addToList("responsibilities", newResponsibility, setNewResponsibility)} 
                    className="px-4 py-2 bg-[#34aeeb] hover:bg-[#2a8bc7] text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer">Add</button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.responsibilities.map((resp, index) => (
                  <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                    <span>{resp}</span>
                    <button type="button" onClick={() => removeFromList("responsibilities", index)} className="text-red-500 hover:text-red-700 cursor-pointer">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Benefits</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add Benefit</label>
                <div className="flex space-x-2">
                  <input type="text" value={newBenefit} onChange={(e) => setNewBenefit(e.target.value)} 
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                    placeholder="e.g., Health insurance, Remote work" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('benefits', newBenefit, setNewBenefit))} />
                  <button type="button" onClick={() => addToList("benefits", newBenefit, setNewBenefit)} 
                    className="px-4 py-2 bg-[#34aeeb] hover:bg-[#2a8bc7] text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer">Add</button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.benefits.map((benefit, index) => (
                  <span key={index} className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                    <span>{benefit}</span>
                    <button type="button" onClick={() => removeFromList("benefits", index)} className="text-red-500 hover:text-red-700 cursor-pointer">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Application Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Application Deadline</label>
                <input type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Email *</label>
                <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#34aeeb]" 
                  placeholder="hr@company.com" required />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate("/jobs")} 
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors duration-200 cursor-pointer">Cancel</button>
            <button type="submit" 
              className="px-6 py-2 bg-[#34aeeb] hover:bg-[#2a8bc7] text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer">Post Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;