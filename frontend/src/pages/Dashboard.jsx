import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100">
            Dashboard
          </h1>
          <p className="text-gray-300 mt-2">
            Welcome back! Here's what's happening with your job search.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#34aeeb] rounded-lg flex items-center justify-center">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Applied</p>
                <p className="text-2xl font-semibold text-gray-100">24</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
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
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Accepted</p>
                <p className="text-2xl font-semibold text-gray-100">8</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Pending</p>
                <p className="text-2xl font-semibold text-gray-100">5</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Rejected</p>
                <p className="text-2xl font-semibold text-gray-100">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications and Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-gray-100">
                Recent Applications
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-100">Frontend Developer</h3>
                  <p className="text-sm text-gray-300">Tech Corp</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                  Pending
                </span>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-100">Backend Developer</h3>
                  <p className="text-sm text-gray-300">Webify Ltd</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Interview
                </span>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-100">Full Stack Developer</h3>
                  <p className="text-sm text-gray-300">Code Inc</p>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                  Rejected
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-gray-100">Recommended Jobs</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                <h3 className="font-semibold text-gray-100">React Developer</h3>
                <p className="text-sm text-gray-300 mb-2">Innovation Labs</p>
                <p className="text-sm text-gray-400">$120,000 • Remote</p>
              </div>

              <div className="p-4 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                <h3 className="font-semibold text-gray-100">Software Engineer</h3>
                <p className="text-sm text-gray-300 mb-2">Web Solutions</p>
                <p className="text-sm text-gray-400">$100,000 • Hybrid</p>
              </div>

              <div className="p-4 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                <h3 className="font-semibold text-gray-100">Tech Lead</h3>
                <p className="text-sm text-gray-300 mb-2">Digital Agency</p>
                <p className="text-sm text-gray-400">$130,000 • On-site</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
