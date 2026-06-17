import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = sessionStorage.getItem('labthread_admin_session');
  const expiry = sessionStorage.getItem('labthread_admin_expiry');

  if (!token || !expiry) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (Date.now() > parseInt(expiry, 10)) {
    sessionStorage.removeItem('labthread_admin_session');
    sessionStorage.removeItem('labthread_admin_expiry');
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
