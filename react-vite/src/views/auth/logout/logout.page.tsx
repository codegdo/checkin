import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';

const Logout: React.FC = (): JSX.Element | null => {
  const { loggedIn } = useSelector((state: AppState) => state.session);
  const { deleteSession } = useAction();
  const { mutate: logout } = useFetch('/api/auth/logout');
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      deleteSession();
      logout();
    }
    navigate('/login');
  }, [loggedIn]);

  return null;
}

export default Logout;