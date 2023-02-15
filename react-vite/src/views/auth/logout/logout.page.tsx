import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../../helpers';

import { useAction, useFetch } from '../../../hooks';

const Logout: React.FC = (): JSX.Element => {

  const { mutate: logout } = useFetch('/api/auth/logout');

  const navigate = useNavigate();
  const { deleteSession } = useAction();

  useEffect(() => {
    logout();
    deleteSession();
    navigate('/login');
  }, []);

  return <></>
}

export default Logout;