import Navbar from '../components/Navbar';

const CompaniesPage = () => {
  const companies = [
    {
      id: 1,
      name: "TechCorp Inc.",
      description: "Leading technology company specializing in AI and machine learning solutions.",
      location: "San Francisco, CA",
      employees: "500-1000",
      industry: "Technology",
      logo: "🏢",
      jobs: 12,
      verified: true
    },
    {
      id: 2,
      name: "StartupXYZ",
      description: "Innovative startup building the future of fintech with cutting-edge solutions.",
      location: "Remote",
      employees: "50-200",
      industry: "Fintech",
      logo: "🚀",
      jobs: 8,
      verified: true
    },
    {
      id: 3,
      name: "DesignStudio",
      description: "Creative agency focused on digital design and user experience.",
      location: "New York, NY",
      employees: "20-50",
      industry: "Design",
      logo: "🎨",
      jobs: 5,
      verified: false
    },
    {
      id: 4,
      name: "DataFlow Systems",
      description: "Enterprise software company providing data analytics and business intelligence.",
      location: "Austin, TX",
      employees: "200-500",
      industry: "Software",
      logo: "📊",
      jobs: 15,
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Top Companies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover amazing companies that are hiring. Find your perfect workplace and join teams that inspire you.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Company name or industry"
                className="flex-1 form-input text-lg py-4 px-6"
              />
              <input
                type="text"
                placeholder="Location"
                className="flex-1 form-input text-lg py-4 px-6"
              />
              <button className="btn-primary px-8 py-4 text-lg font-semibold">
                Search Companies
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
              All Companies
            </button>
            <button className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Verified
            </button>
            <button className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Remote First
            </button>
            <button className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Startup
            </button>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {companies.map((company) => (
            <div key={company.id} className="card hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  {company.logo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {company.name}
                    </h3>
                    {company.verified && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    📍 {company.location}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    👥 {company.employees} employees
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {company.description}
              </p>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                    {company.industry}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {company.jobs} open positions
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 btn-primary py-3">
                  View Jobs
                </button>
                <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button className="btn-secondary px-8 py-4 text-lg font-semibold">
            Load More Companies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
