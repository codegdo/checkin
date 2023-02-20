import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { AppStatus } from '../../../constants';

const Setup: React.FC = (): JSX.Element => {
  const { status } = useSelector((state: AppState) => state.session);

  const navigate = useNavigate();
  const { mutate: submitVerify } = useFetch('/api/auth/verify');

  useEffect(() => {
    (status === AppStatus.ACTIVE) && navigate('/');
    (status === AppStatus.REQUIRE_VERIFY) && navigate('/auth/verify');
    (status === AppStatus.UNAUTHENTICATED) && navigate('/auth/login');
  }, [status]);

  return <>verify</>;
}

export default Setup;