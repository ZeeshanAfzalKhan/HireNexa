# HireNexa Frontend

A modern, responsive hiring platform built with React and Tailwind CSS, featuring dark/light theme switching and a beautiful UI.

## Features

- 🎨 **Modern Design**: Clean, professional interface with smooth animations
- 🌙 **Theme Switching**: Toggle between light and dark modes
- 📱 **Responsive**: Fully responsive design that works on all devices
- 🔐 **Authentication**: Login and signup pages with form validation
- 🎯 **User Roles**: Support for both job seekers and recruiters
- 🔗 **OAuth Integration**: Ready for Google, GitHub, and LinkedIn authentication
- ⚡ **Fast Performance**: Built with Vite for optimal performance

## Tech Stack

- **React 19** - Modern React with latest features
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
frontend/src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx     # Navigation component
│   └── ThemeToggle.jsx # Theme switching component
├── contexts/          # React contexts
│   └── ThemeContext.jsx # Theme management
├── pages/            # Page components
│   ├── LandingPage.jsx # Homepage
│   ├── LoginPage.jsx   # Login page
│   ├── SignupPage.jsx  # Registration page
│   └── Dashboard.jsx   # User dashboard
├── App.jsx           # Main app component
├── App.css          # Global styles and theme variables
└── main.jsx         # App entry point
```

## Theme System

The app includes a comprehensive theme system with:

- **Light Mode**: Clean white background with blue accents (#34aeeb)
- **Dark Mode**: Dark gray background with the same blue accents
- **Smooth Transitions**: All theme changes are animated
- **Persistent Storage**: Theme preference is saved in localStorage

### Theme Variables

The theme system uses CSS custom properties defined in `App.css`:

```css
:root {
  --primary-color: #34aeeb;
  --primary-dark: #2a8bc7;
  --primary-light: #5bbef0;
  --secondary-color: #ffffff;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --border-color: #e5e7eb;
}
```

## Color Scheme

The design uses a professional color palette:

- **Primary Blue**: #34aeeb (main brand color)
- **Primary Dark**: #2a8bc7 (hover states)
- **Primary Light**: #5bbef0 (gradients)
- **White**: #ffffff (backgrounds)
- **Gray Scale**: Various shades for text and borders

## Components

### Navbar
- Responsive navigation with mobile support
- Theme toggle button
- Logo and branding
- Authentication links

### ThemeToggle
- Smooth theme switching
- Accessible button with proper ARIA labels
- Icon changes based on current theme

### Forms
- Modern input styling with focus states
- Password strength indicator
- Form validation
- OAuth integration buttons

## Responsive Design

The app is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## Backend Integration

The frontend is designed to work with the HireNexa backend API:

- **Authentication**: `/api/auth` endpoints
- **User Management**: `/api/profile` endpoints
- **Company Management**: `/api/company` endpoints
- **Job Management**: `/api/job` endpoints
- **Applications**: `/api/application` endpoints

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- Uses ESLint for code quality
- Follows React best practices
- Consistent component structure
- Proper TypeScript-like prop validation

## Future Enhancements

- [ ] Job search and filtering
- [ ] Company profiles and job postings
- [ ] Application tracking
- [ ] Real-time notifications
- [ ] Advanced user profiles
- [ ] File upload for resumes
- [ ] Messaging system
- [ ] Analytics dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the HireNexa platform.