import React from 'react';
import { CheckCircle, Zap, Heart, Info } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#34aeeb] rounded-2xl mb-4">
            <Info className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            About HireNexa
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            We're revolutionizing the way people find jobs and companies find talent.
            Our platform connects the right people with the right opportunities.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-[#34aeeb] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <CheckCircle className="w-6 h-6" />
                Our Mission
              </h2>
            </div>
            <div className="p-8">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                To bridge the gap between talented professionals and innovative companies,
                making the job search process more efficient, transparent, and successful for everyone involved.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                We believe that finding the right job shouldn't be a struggle. With our advanced
                matching algorithms and user-friendly platform, we're making career advancement accessible to all.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-[#34aeeb] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Zap className="w-6 h-6" />
                Our Vision
              </h2>
            </div>
            <div className="p-8">
              <p className="text-gray-600 dark:text-gray-400">
                To become the world's leading platform for career connections,
                empowering millions of professionals to achieve their career goals.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-[#34aeeb] px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Heart className="w-6 h-6" />
              Our Values
            </h2>
            <p className="text-blue-100 mt-2">The principles that guide everything we do</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Transparency */}
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="w-12 h-12 bg-[#34aeeb] rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Transparency</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We believe in open communication and honest information sharing between all parties.
                </p>
              </div>

              {/* Efficiency */}
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="w-12 h-12 bg-[#34aeeb] rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Efficiency</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We streamline the hiring process to save time for both job seekers and employers.
                </p>
              </div>

              {/* Passion */}
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="w-12 h-12 bg-[#34aeeb] rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Passion</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We're passionate about helping people find fulfilling careers and companies find great talent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
