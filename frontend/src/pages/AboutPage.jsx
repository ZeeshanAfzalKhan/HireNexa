import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About HireNexa
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're revolutionizing the way people find jobs and companies find talent.
            Our platform connects the right people with the right opportunities.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              To bridge the gap between talented professionals and innovative companies,
              making the job search process more efficient, transparent, and successful for everyone involved.
            </p>
            <p className="text-lg text-gray-300">
              We believe that finding the right job shouldn't be a struggle. With our advanced
              matching algorithms and user-friendly platform, we're making career advancement accessible to all.
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg opacity-90">
              To become the world's leading platform for career connections,
              empowering millions of professionals to achieve their career goals.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Transparency */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="w-12 h-12 bg-[#34aeeb] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Transparency</h3>
              <p className="text-gray-300">
                We believe in open communication and honest information sharing between all parties.
              </p>
            </div>

            {/* Efficiency */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="w-12 h-12 bg-[#34aeeb] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Efficiency</h3>
              <p className="text-gray-300">
                We streamline the hiring process to save time for both job seekers and employers.
              </p>
            </div>

            {/* Passion */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="w-12 h-12 bg-[#34aeeb] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Passion</h3>
              <p className="text-gray-300">
                We're passionate about helping people find fulfilling careers and companies find great talent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
