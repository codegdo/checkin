import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAction } from '../../../hooks';

const Logout: React.FC = (): JSX.Element => {

  const navigate = useNavigate();
  const { deleteSession } = useAction();

  useEffect(() => {
    deleteSession();
    navigate('/login');
  }, []);

  return <></>
}

export default Logout;