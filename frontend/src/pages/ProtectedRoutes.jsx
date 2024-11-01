import React from 'react'
import { useAuth } from '../AuthContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
  const {user} = useAuth();
  return user ? children : <Navigate to="/login"/>;
};

export default ProtectedRoutes