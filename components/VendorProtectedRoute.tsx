import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserAuth } from '../contexts/UserAuthContext';

const VendorProtectedRoute: React.FC = () => {
  const { currentUser } = useUserAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/vendor/login" state={{ from: location }} replace />;
  }
  
  if (currentUser.role !== 'vendor') {
     // If a logged-in customer tries to access a vendor route, send them home.
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default VendorProtectedRoute;
