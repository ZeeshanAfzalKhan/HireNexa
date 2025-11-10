import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#34aeeb] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Job not found</h1>
          <p className="text-gray-300">The job you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow p-8">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-100 mb-2">{job.title}</h1>
                    <p className="text-xl text-gray-300 mb-4">{job.company}</p>
                  </div>
                  <span className="px-4 py-2 bg-[#34aeeb] text-white text-sm rounded-full">
                    {job.jobType}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
                  <span className="flex items-center">📍 {job.location}</span>
                  <span className="flex items-center">💰 {job.salary}</span>
                  <span className="flex items-center">🧠 {job.experience}</span>
                  <span className="flex items-center">📅 Posted {job.postedDate}</span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-gray-100 mb-4">Job Description</h2>
                <div className="text-gray-300 whitespace-pre-line">{job.description}</div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-100 mb-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#34aeeb] text-white text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Button */}
            <div className="bg-gray-800 rounded-lg shadow p-6">
              <button
                onClick={handleApply}
                disabled={applying}
                className="w-full bg-[#34aeeb] hover:bg-[#2a8bc7] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {applying ? "Applying..." : "Apply Now"}
              </button>
              <p className="text-sm text-gray-400 text-center mt-2">
                You'll be redirected to the application form
              </p>
            </div>

            {/* Company Info */}
            <div className="bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                About {job.companyInfo.name}
              </h3>
              <p className="text-gray-300 mb-4">{job.companyInfo.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Industry:</span>
                  <span className="text-gray-100">{job.companyInfo.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Size:</span>
                  <span className="text-gray-100">{job.companyInfo.employees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Website:</span>
                  <a
                    href={job.companyInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#34aeeb] hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">Similar Jobs</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-700 pb-4">
                  <h4 className="font-medium text-gray-100">Frontend Developer</h4>
                  <p className="text-sm text-gray-400">Creative Solutions</p>
                  <p className="text-sm text-gray-400">$120,000</p>
                </div>
                <div className="border-b border-gray-700 pb-4">
                  <h4 className="font-medium text-gray-100">Full Stack Engineer</h4>
                  <p className="text-sm text-gray-400">TechWave</p>
                  <p className="text-sm text-gray-400">$115,000</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-100">React Developer</h4>
                  <p className="text-sm text-gray-400">NextGen Agency</p>
                  <p className="text-sm text-gray-400">$105,000</p>
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


