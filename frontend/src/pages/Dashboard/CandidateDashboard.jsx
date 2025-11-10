import React from 'react';
const CandidateDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Candidate Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">Recent Applications</div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">Recommended Jobs</div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">Profile Completion</div>
      </div>
    </div>
  );
};

export default CandidateDashboard;