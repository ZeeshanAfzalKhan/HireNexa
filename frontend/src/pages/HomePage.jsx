import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Job with <span className="text-[#34aeeb]">HireNexa</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Connect with top companies and discover opportunities that match your skills and aspirations. Join thousands of professionals who found their perfect career match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup/student"
              className="bg-gray-100 text-gray-900 hover:bg-gray-300 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg"
            >
              Get Started Free (Student)
            </Link>
            <Link
              to="/signup/recruitor"
              className="bg-gray-100 text-gray-900 hover:bg-gray-300 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg"
            >
              Recruiter Signup
            </Link>
            <Link
              to="/jobs"
              className="border-2 border-gray-100 text-gray-100 hover:bg-gray-100 hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose HireNexa?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We make job hunting simple, efficient, and successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Job Matching</h3>
              <p className="text-gray-300">
                Our AI-powered algorithm matches you with jobs that align with your skills, experience, and career goals.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Top Companies</h3>
              <p className="text-gray-300">
                Connect with leading companies across various industries. From startups to Fortune 500 companies.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast Application Process</h3>
              <p className="text-gray-300">
                Apply to multiple jobs with just one click. Save time with our streamlined application process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-gray-300">Join our growing community of successful job seekers and employers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#34aeeb] mb-2">10K+</div>
              <div className="text-gray-300">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#34aeeb] mb-2">5K+</div>
              <div className="text-gray-300">Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#34aeeb] mb-2">50K+</div>
              <div className="text-gray-300">Job Seekers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#34aeeb] mb-2">95%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Create your profile today and get matched with the perfect job opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup/student"
              className="bg-gray-100 text-gray-900 hover:bg-gray-300 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg"
            >
              Student Signup
            </Link>
            <Link
              to="/signup/recruitor"
              className="bg-gray-100 text-gray-900 hover:bg-gray-300 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg"
            >
              Recruiter Signup
            </Link>
            <Link
              to="/about"
              className="border-2 border-gray-100 text-gray-100 hover:bg-gray-100 hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer removed to avoid duplicate; global Footer handles site-wide footer */}
    </div>
  );
};

export default LandingPage;
