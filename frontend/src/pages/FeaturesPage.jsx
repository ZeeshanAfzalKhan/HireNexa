import Navbar from '../components/Navbar';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Features
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the powerful features that make HireNexa the best platform for job seekers and employers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;