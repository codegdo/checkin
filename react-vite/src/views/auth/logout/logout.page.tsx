import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { UserStatus } from '../../../store/types';

const Logout: React.FC = (): JSX.Element | null => {
  const { user } = useSelector((state: AppState) => state.session);
  const { deleteSession } = useAction();
  const { mutate: logout } = useFetch('/api/auth/logout');
  const navigate = useNavigate();

  useEffect(() => {
    user && logout();
    deleteSession();
    navigate('/auth/login');
  }, [user]);

  return null;
}

export default Logout;