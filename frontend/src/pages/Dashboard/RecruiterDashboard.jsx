import React from 'react';
const RecruiterDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Recruiter Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">Active Job Posts</div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">Recent Applications</div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">Team Activity</div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;