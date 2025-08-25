import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserAuth } from '../contexts/UserAuthContext';

const UserProtectedRoute: React.FC = () => {
  const { currentUser } = useUserAuth();
  const location = useLocation();

  return currentUser ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default UserProtectedRoute;