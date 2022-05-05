import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useLogout } from '../../../hooks';
import { AppState } from '../../../store/reducers';

const Logout: React.FC = (): JSX.Element => {
  const { user } = useSelector((state: AppState) => state.session);
  const navigate = useNavigate();
  const [_, logout] = useLogout();

  useEffect(() => {
    !user && navigate('/');
  }, [user]);

  useEffect(() => {
    logout();
  }, []);

  return <div>logout...</div>;
};

export default Logout;