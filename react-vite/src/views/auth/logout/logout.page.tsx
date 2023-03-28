import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';

function Logout() {
  const { user } = useSelector((state: AppState) => state);
  const { logoutCurrent } = useAction();
  const { mutate: logout } = useFetch('/api/auth/logout');
  const navigate = useNavigate();

  useEffect(() => {
    user && logout();
    logoutCurrent();
    navigate('/auth/login');
  }, [user]);

  return null;
}

export default Logout;