# HireNexa

A modern job portal application connecting job seekers with recruiters. Built with MERN stack (MongoDB, Express.js, React, Node.js).

## Features

### For Job Seekers (Students)
- **Profile Management**: Create and manage professional profiles with bio, skills, resume, and social links
- **Job Search**: Browse and filter jobs by keyword, location, job type, salary, and experience
- **Apply to Jobs**: Submit applications with cover letters and resumes
- **Track Applications**: View all submitted applications and their status
- **Skills Management**: Add/remove skills with real-time validation

### For Recruiters
- **Company Management**: Create and manage company profiles
- **Post Jobs**: Create job listings with detailed requirements
- **Manage Jobs**: Update and delete posted jobs
- **View Applications**: Review applications for each job posting
- **Application Management**: Accept or reject applications
- **Dashboard**: View all posted jobs and application statistics

### General Features
- **Authentication**: Secure login/signup with JWT and OAuth (Google, GitHub, LinkedIn)
- **Role-Based Access**: Separate interfaces for students and recruiters
- **Responsive Design**: Mobile-friendly UI with dark mode support
- **File Upload**: Resume and profile picture upload via Cloudinary
- **Real-time Updates**: Redux state management for instant UI updates

## Tech Stack

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - File storage
- **Validator** - Input validation

## Project Structure

```
HireNexa/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── middlewares/     # Auth & validation
│   ├── utils/           # Helper functions
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── redux/       # State management
│   │   ├── hooks/       # Custom hooks
│   │   └── utils/       # Helper functions
│   └── public/
└── README.md
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
ACCESS_TOKEN_EXPIRE_TIME=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

4. Start server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

4. Start development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout

### Profile
- `GET /api/v1/profile` - Get user profile
- `PATCH /api/v1/profile/update` - Update profile
- `PATCH /api/v1/profile/profile-picture/update` - Upload profile picture
- `PATCH /api/v1/profile/resume/update` - Upload resume
- `PATCH /api/v1/profile/skills/add` - Add skill
- `PATCH /api/v1/profile/skills/delete` - Delete skill
- `PATCH /api/v1/profile/change-password` - Change password

### Jobs
- `GET /api/v1/job/get` - Get all jobs (with filters)
- `GET /api/v1/job/get-by-id/:id` - Get job by ID
- `POST /api/v1/job/post` - Post new job (recruiter only)
- `GET /api/v1/job/get-admin-jobs` - Get recruiter's jobs
- `PATCH /api/v1/job/update/:id` - Update job (recruiter only)
- `DELETE /api/v1/job/delete/:id` - Delete job (recruiter only)

### Applications
- `POST /api/v1/application/apply/:jobId` - Apply to job
- `GET /api/v1/application/get-applied-jobs` - Get user's applications
- `GET /api/v1/application/get-applications/:jobId` - Get job applications (recruiter only)
- `PATCH /api/v1/application/update-status/:applicationId` - Update application status

### Company
- `POST /api/v1/company/register` - Register company
- `GET /api/v1/company/get` - Get company details
- `PATCH /api/v1/company/update/:id` - Update company
- `DELETE /api/v1/company/delete/:id` - Delete company

## Database Models

### User
- firstName, lastName, emailId, phoneNumber
- password (hashed), role (student/recruiter)
- profile: bio, skills, resume, profilePicture, socials, company
- OAuth providers support

### Job
- title, description, skillRequired
- salary, experience, location, jobType, position
- company (ref), createdBy (ref)

### Application
- job (ref), applicant (ref)
- coverLetter, resume, status (pending/accepted/rejected)

### Company
- name, description, website, location, logo
- createdBy (ref)

## Key Features Implementation

### Authentication
- JWT-based authentication with HTTP-only cookies
- Password hashing with bcrypt
- OAuth integration (Google, GitHub, LinkedIn)
- Role-based access control

### File Upload
- Cloudinary integration for resume and profile pictures
- File type validation (PDF for resumes, images for profile pictures)
- Automatic cleanup of old files on update

### Skills Management
- Real-time skill addition/deletion
- Duplicate prevention
- Character length validation (2-50 chars)
- Maximum 30 skills per user

### Application System
- Duplicate application prevention
- Resume requirement validation
- Cover letter validation (20-5000 chars)
- Status tracking (pending/accepted/rejected)

### Job Management
- Advanced filtering (keyword, location, salary, experience)
- Pagination support
- Sorting options
- Ownership validation for updates/deletes

## Security Features

- Password strength validation
- Input sanitization and validation
- Protected routes with authentication middleware
- Role-based authorization
- CORS configuration
- HTTP-only cookies for tokens
- File type and size validation

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue in the repository.
