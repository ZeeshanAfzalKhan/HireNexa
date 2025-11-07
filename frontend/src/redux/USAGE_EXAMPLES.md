# Redux Toolkit Setup - Usage Examples

This Redux setup uses AsyncThunk and provides custom hooks for easy usage across your React components.

## Available Hooks

### 1. useAuth Hook
```javascript
import { useAuth } from "../redux/hooks";

function LoginComponent() {
  const { login, signup, logout, user, isAuthenticated, loading, error } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ email: "user@example.com", password: "password123" });
      // User is now logged in
    } catch (err) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {isAuthenticated ? (
        <div>
          <p>Welcome {user?.fullName}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### 2. useJobs Hook
```javascript
import { useJobs } from "../redux/hooks";

function JobsComponent() {
  const { 
    jobs, 
    currentJob, 
    adminJobs, 
    loading, 
    error, 
    fetchAllJobs, 
    fetchJobById, 
    postJob,
    filters,
    setFilters 
  } = useJobs();

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const handleCreateJob = async () => {
    try {
      await postJob({
        title: "Software Engineer",
        description: "Job description...",
        requirements: ["React", "Node.js"],
        salary: 80000,
        location: "Remote",
        jobType: "Full-time",
        experience: "2 years",
        position: 1,
        companyId: "company123"
      });
    } catch (err) {
      console.error("Failed to create job:", error);
    }
  };

  return (
    <div>
      {loading && <p>Loading jobs...</p>}
      {error && <p>Error: {error}</p>}
      
      <div>
        <h3>Filter Jobs</h3>
        <input 
          placeholder="Keyword"
          value={filters.keyword}
          onChange={(e) => setFilters({ keyword: e.target.value })}
        />
      </div>

      <div>
        {jobs.map(job => (
          <div key={job._id}>
            <h4>{job.title}</h4>
            <p>{job.description}</p>
            <button onClick={() => fetchJobById(job._id)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. useCompany Hook
```javascript
import { useCompany } from "../redux/hooks";

function CompanyComponent() {
  const { 
    company, 
    companies, 
    loading, 
    error, 
    registerCompany, 
    getCompany, 
    updateCompany,
    updateCompanyLogo 
  } = useCompany();

  useEffect(() => {
    getCompany();
  }, []);

  const handleRegisterCompany = async () => {
    try {
      await registerCompany({
        name: "Tech Corp",
        description: "A tech company",
        website: "https://techcorp.com",
        location: "San Francisco, CA"
      });
    } catch (err) {
      console.error("Failed to register company:", error);
    }
  };

  const handleLogoUpload = async (file) => {
    try {
      await updateCompanyLogo(company._id, file);
    } catch (err) {
      console.error("Failed to upload logo:", error);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {company ? (
        <div>
          <h3>{company.name}</h3>
          <p>{company.description}</p>
          <input type="file" onChange={(e) => handleLogoUpload(e.target.files[0])} />
        </div>
      ) : (
        <button onClick={handleRegisterCompany}>Register Company</button>
      )}
    </div>
  );
}
```

### 4. useProfile Hook
```javascript
import { useProfile } from "../redux/hooks";

function ProfileComponent() {
  const { 
    profile, 
    loading, 
    error, 
    getProfile, 
    updateProfile, 
    uploadProfilePicture,
    changePassword 
  } = useProfile();

  useEffect(() => {
    getProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile({
        fullName: "John Doe",
        email: "john@example.com",
        phoneNumber: "1234567890",
        bio: "Software developer with 5 years experience"
      });
    } catch (err) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleProfilePictureUpload = async (file) => {
    try {
      await uploadProfilePicture(file);
    } catch (err) {
      console.error("Failed to upload profile picture:", error);
    }
  };

  return (
    <div>
      {loading && <p>Loading profile...</p>}
      {error && <p>Error: {error}</p>}
      
      {profile && (
        <div>
          <h3>{profile.fullName}</h3>
          <p>{profile.email}</p>
          <p>{profile.bio}</p>
          <input type="file" onChange={(e) => handleProfilePictureUpload(e.target.files[0])} />
          <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
      )}
    </div>
  );
}
```

### 5. useApplication Hook
```javascript
import { useApplication } from "../redux/hooks";

function ApplicationComponent() {
  const { 
    applications, 
    appliedJobs, 
    loading, 
    error, 
    applyToJob, 
    getAppliedJobs,
    updateApplicationStatus 
  } = useApplication();

  useEffect(() => {
    getAppliedJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      await applyToJob(jobId, {
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        address: "123 Main St",
        resume: resumeFile // File object
      });
    } catch (err) {
      console.error("Failed to apply:", error);
    }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
    } catch (err) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div>
      {loading && <p>Loading applications...</p>}
      {error && <p>Error: {error}</p>}
      
      <div>
        <h3>Applied Jobs</h3>
        {appliedJobs.map(application => (
          <div key={application._id}>
            <h4>{application.job.title}</h4>
            <p>Status: {application.status}</p>
            <button onClick={() => handleStatusUpdate(application._id, "accepted")}>
              Accept
            </button>
            <button onClick={() => handleStatusUpdate(application._id, "rejected")}>
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## State Structure

```javascript
// Auth State
{
  auth: {
    user: null | { _id, fullName, email, role, ... },
    token: null | string,
    isAuthenticated: boolean,
    loading: boolean,
    error: null | string
  }
}

// Jobs State
{
  jobs: {
    jobs: [],
    currentJob: null | { _id, title, description, ... },
    adminJobs: [],
    loading: boolean,
    error: null | string,
    filters: {
      keyword: "",
      location: "",
      jobType: "",
      experience: ""
    }
  }
}

// Company State
{
  company: {
    company: null | { _id, name, description, ... },
    companies: [],
    loading: boolean,
    error: null | string
  }
}

// Profile State
{
  profile: {
    profile: null | { _id, fullName, email, bio, ... },
    loading: boolean,
    error: null | string
  }
}

// Application State
{
  application: {
    applications: [],
    appliedJobs: [],
    loading: boolean,
    error: null | string
  }
}
```

## Error Handling

All async thunks include proper error handling:

```javascript
const handleLogin = async () => {
  try {
    await login({ email, password });
  } catch (err) {
    // Error is automatically handled and stored in state
    console.log("Login error:", error); // Access via useAuth().error
  }
};
```

## Loading States

Each hook provides loading states:

```javascript
const { loading } = useAuth(); // For auth operations
const { loading: jobsLoading } = useJobs(); // For jobs operations
const { loading: companyLoading } = useCompany(); // For company operations
```

## File Uploads

File uploads are handled with FormData:

```javascript
// Profile picture upload
const handleFileUpload = async (file) => {
  await uploadProfilePicture(file);
};

// Resume upload
const handleResumeUpload = async (file) => {
  await uploadResume(file);
};

// Company logo upload
const handleLogoUpload = async (file) => {
  await updateCompanyLogo(companyId, file);
};

// Job application with resume
const handleApply = async (jobId, resumeFile) => {
  await applyToJob(jobId, {
    name: "John Doe",
    email: "john@example.com",
    resume: resumeFile
  });
};
```