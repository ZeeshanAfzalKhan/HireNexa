import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-500">404</h1>
        <p className="text-2xl md:text-3xl font-semibold mt-4">Page Not Found</p>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Sorry, the page you are looking for does not exist.</p>
        <div className="mt-8">
          <Link 
            to="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;