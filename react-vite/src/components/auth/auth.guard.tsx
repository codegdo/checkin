import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth.hook';

function AuthGuard(): JSX.Element {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // alert(isAuthenticated);
    if (!isAuthenticated) {
      navigate('auth/login')
    }
  }, [isAuthenticated]);

  return <Outlet />
}

export default AuthGuard;