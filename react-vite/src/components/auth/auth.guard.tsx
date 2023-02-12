import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth.hook';

export const AuthGuard: React.FC = (): JSX.Element => {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('auth/login')
    }
  }, []);

  return <Outlet />
}