import React, { useState } from "react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    personal: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      bio: "Experienced software developer with 5+ years in web development.",
      location: "San Francisco, CA",
    },
    professional: {
      title: "Senior Software Developer",
      experience: "5+ years",
      skills: ["React", "JavaScript", "Node.js", "Python", "AWS", "Docker"],
      resume: "john_doe_resume.pdf",
      portfolio: "https://johndoe.dev",
    },
    social: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      website: "https://johndoe.dev",
      twitter: "https://twitter.com/johndoe",
    },
    preferences: {
      jobAlerts: true,
      emailNotifications: true,
      smsNotifications: false,
      privacy: "public",
    },
  });

  const handleInputChange = (section, field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      alert("Profile updated successfully!");
    }, 2000);
  };

  const handleFileUpload = (file, type) => {
    console.log(`Uploading ${type}:`, file);
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "professional", label: "Professional", icon: "💼" },
    { id: "social", label: "Social Links", icon: "🔗" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Profile Management
          </h1>
          <p className="text-gray-300">
            Manage your profile information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[#34aeeb] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {profileData.personal.firstName[0]}
                    {profileData.personal.lastName[0]}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-100">
                  {profileData.personal.firstName}{" "}
                  {profileData.personal.lastName}
                </h3>
                <p className="text-sm text-gray-300">
                  {profileData.professional.title}
                </p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-[#34aeeb] text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg shadow">
              {/* Tab Header */}
              <div className="border-b border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-100">
                    {tabs.find((tab) => tab.id === activeTab)?.label}
                  </h2>
                  <div className="flex space-x-3">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className="px-4 py-2 bg-[#34aeeb] text-white rounded-lg hover:bg-[#2a8bc7] disabled:opacity-50"
                        >
                          {loading ? "Saving..." : "Save Changes"}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-[#34aeeb] text-white rounded-lg hover:bg-[#2a8bc7]"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Example tab content (personal) */}
              <div className="p-6">
                {activeTab === "personal" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profileData.personal.firstName}
                          onChange={(e) =>
                            handleInputChange(
                              "personal",
                              "firstName",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#34aeeb] disabled:bg-gray-700 text-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={profileData.personal.lastName}
                          onChange={(e) =>
                            handleInputChange(
                              "personal",
                              "lastName",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#34aeeb] disabled:bg-gray-700 text-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


