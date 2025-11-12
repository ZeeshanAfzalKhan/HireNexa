import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../redux/hooks/useAuth.js';

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const { getCurrentUser, user, isAuthenticated } = useAuth();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await getCurrentUser(); // get user from backend via cookie


        // Redirect based on authentication + role
        if (isAuthenticated && user) {
          if (user.role === 'recruitor') {
            navigate('/recruitor-dashboard', { replace: true });
          } else if (user.role === 'student') {
            navigate('/candidate-dashboard', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        } else {
          navigate('/login/student?oauth=cancelled', { replace: true });
        }
      } catch {
        navigate('/login/student?oauth=cancelled', { replace: true });
      }
    };

    verifyUser();
  }, [getCurrentUser, isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-lg">Authenticating...</p>
    </div>
  );
};

export default OAuthCallbackPage;