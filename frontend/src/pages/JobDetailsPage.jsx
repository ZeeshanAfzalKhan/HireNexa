import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, DollarSign, Clock, Calendar, Building2, Globe, Users, Briefcase, ArrowRight } from 'lucide-react';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const mockJob = {
      id: parseInt(id),
      title: "Senior React Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      jobType: "Full-time",
      experience: "5+ years",
      description: `We are looking for a senior React developer to join our dynamic team. You will be responsible for building user-facing features and reusable components using React.js.

## Key Responsibilities:
- Develop new user-facing features using React.js
- Build reusable components and front-end libraries
- Optimize applications for maximum speed and scalability
- Collaborate with other team members and stakeholders
- Translate designs and wireframes into high-quality code
- Ensure the technical feasibility of UI/UX designs

## Requirements:
- 5+ years of experience with React.js
- Strong proficiency in JavaScript
- Thorough understanding of React.js and its core principles
- Experience with Redux
- Familiarity with RESTful APIs
- Knowledge of JWT authorization
- Experience with Webpack, NPM, etc.
- A knack for optimization and problem solving.`,
      skills: ["React", "JavaScript", "TypeScript", "Node.js", "Redux", "Webpack", "Git"],
      postedDate: "2024-01-15",
      companyInfo: {
        name: "Tech Corp",
        description: "A leading technology company focused on innovation and growth.",
        website: "https://techcorp.com",
        employees: "500-1000",
        industry: "Technology",
      },
    };

    setTimeout(() => {
      setJob(mockJob);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    navigate(`/apply/${id}`);
    setApplying(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#34aeeb] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Job not found</h1>
          <p className="text-gray-600 dark:text-gray-400">The job you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-[#34aeeb] px-8 py-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                    <div className="flex items-center gap-2 text-blue-100">
                      <Building2 className="w-5 h-5" />
                      <span className="text-xl font-medium">{job.company}</span>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-xl border border-white/30">
                    {job.jobType}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <MapPin className="w-5 h-5 text-[#34aeeb]" />
                    <span className="text-gray-700 dark:text-gray-300">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <DollarSign className="w-5 h-5 text-[#34aeeb]" />
                    <span className="text-gray-700 dark:text-gray-300">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Clock className="w-5 h-5 text-[#34aeeb]" />
                    <span className="text-gray-700 dark:text-gray-300">{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Calendar className="w-5 h-5 text-[#34aeeb]" />
                    <span className="text-gray-700 dark:text-gray-300">Posted {job.postedDate}</span>
                  </div>
                </div>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-[#34aeeb]" />
                    Job Description
                  </h2>
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{job.description}</div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Required Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 text-sm font-medium rounded-xl border border-blue-200 dark:border-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Button */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-[#34aeeb] px-6 py-4">
                <h3 className="text-lg font-bold text-white">Ready to Apply?</h3>
              </div>
              <div className="p-6">
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="w-full bg-[#34aeeb] hover:bg-[#279ed8] text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {applying ? "Applying..." : (
                    <>
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-3">
                  You'll be redirected to the application form
                </p>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-[#34aeeb] px-6 py-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  About {job.companyInfo.name}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{job.companyInfo.description}</p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Industry:</span>
                    <span className="text-gray-900 dark:text-white font-semibold">{job.companyInfo.industry}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Size:</span>
                    <span className="text-gray-900 dark:text-white font-semibold">{job.companyInfo.employees}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Website:</span>
                    <a
                      href={job.companyInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#34aeeb] hover:underline font-semibold flex items-center gap-1"
                    >
                      <Globe className="w-4 h-4" />
                      Visit
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-[#34aeeb] px-6 py-4">
                <h3 className="text-lg font-bold text-white">Similar Jobs</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Frontend Developer</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Creative Solutions</p>
                    <p className="text-sm font-medium text-[#34aeeb]">$120,000</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Full Stack Engineer</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">TechWave</p>
                    <p className="text-sm font-medium text-[#34aeeb]">$115,000</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <h4 className="font-semibold text-gray-900 dark:text-white">React Developer</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">NextGen Agency</p>
                    <p className="text-sm font-medium text-[#34aeeb]">$105,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;


