import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Zap, Building2 } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#34aeeb] to-[#279ed8] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-8">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Job with <span className="text-white drop-shadow-lg">HireNexa</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Connect with top companies and discover opportunities that match your skills and aspirations. Join thousands of professionals who found their perfect career match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup/student"
              className="bg-white text-[#34aeeb] hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-xl transform hover:scale-105 cursor-pointer"
            >
              Get Started Free (Student)
            </Link>
            <Link
              to="/signup/recruitor"
              className="bg-white text-[#34aeeb] hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-xl transform hover:scale-105 cursor-pointer"
            >
              Recruiter Signup
            </Link>
            <Link
              to="/jobs"
              className="border-2 border-white text-white hover:bg-white hover:text-[#34aeeb] px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 cursor-pointer"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose HireNexa?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We make job hunting simple, efficient, and successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[#34aeeb] to-[#279ed8] rounded-2xl flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Smart Job Matching</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI-powered algorithm matches you with jobs that align with your skills, experience, and career goals.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[#34aeeb] to-[#279ed8] rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Top Companies</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with leading companies across various industries. From startups to Fortune 500 companies.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[#34aeeb] to-[#279ed8] rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Fast Application Process</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Apply to multiple jobs with just one click. Save time with our streamlined application process.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#34aeeb] rounded-2xl mb-6">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Create your profile today and get matched with the perfect job opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup/student"
                className="bg-[#34aeeb] text-white hover:bg-[#279ed8] px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-xl transform hover:scale-105 cursor-pointer"
              >
                Student Signup
              </Link>
              <Link
                to="/signup/recruitor"
                className="bg-[#34aeeb] text-white hover:bg-[#279ed8] px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-xl transform hover:scale-105 cursor-pointer"
              >
                Recruiter Signup
              </Link>
              <Link
                to="/about"
                className="border-2 border-[#34aeeb] text-[#34aeeb] hover:bg-[#34aeeb] hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 cursor-pointer"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
