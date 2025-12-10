import React from 'react';
import { Lightbulb, Search, Zap, Building2, FileText, MessageCircle, ArrowRight } from 'lucide-react';

const FeaturesPage = () => {
  const features = [
    {
      title: "Smart Job Matching",
      description: "Advanced search and filtering system to match you with relevant job opportunities based on your skills and preferences.",
      icon: Lightbulb,
      benefits: ["Skill-based search", "Location filters", "Salary range filters"]
    },
    {
      title: "Advanced Search & Filters",
      description: "Find exactly what you're looking for with our comprehensive search and filtering system.",
      icon: Search,
      benefits: ["Location-based search", "Salary range filters", "Experience level filters"]
    },
    {
      title: "Easy Applications",
      description: "Apply to jobs quickly with your saved profile and resume. Track all your applications in one place.",
      icon: Zap,
      benefits: ["Quick apply", "Saved resume", "Application tracking"]
    },
    {
      title: "Company Profiles",
      description: "View detailed information about companies before applying to their job postings.",
      icon: Building2,
      benefits: ["Company details", "Job listings", "Contact information"]
    },
    {
      title: "Profile Management",
      description: "Create and manage your professional profile with resume upload and skills showcase.",
      icon: FileText,
      benefits: ["Resume upload", "Skills management", "Social links"]
    },
    {
      title: "Application Management",
      description: "Track your job applications and their status in real-time from your dashboard.",
      icon: MessageCircle,
      benefits: ["Status tracking", "Application history", "Real-time updates"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#34aeeb] rounded-2xl mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Powerful Features
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
              Discover all the tools and features that make HireNexa the best platform for job seekers and employers.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our comprehensive suite of features is designed to streamline your job search and career development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                <div className="bg-[#34aeeb] px-6 py-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-[#34aeeb] rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#34aeeb] to-[#2a8bc7] rounded-2xl shadow-xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join HireNexa today and take advantage of all these powerful features to advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center gap-2 bg-white text-[#34aeeb] hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg cursor-pointer transform hover:scale-[1.02]">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-[#34aeeb] px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 cursor-pointer transform hover:scale-[1.02]">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
