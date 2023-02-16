import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { UserStatus } from '../../../store/types';

const Verify: React.FC = (): JSX.Element => {
  const { status } = useSelector((state: AppState) => state.session);

  const navigate = useNavigate();
  const { mutate: submitVerify } = useFetch('/api/auth/verify');

  useEffect(() => {
    (status === UserStatus.ACTIVE) && navigate('/');
    (status === UserStatus.REQUIRE_SETUP_COMPLETE) && navigate('/auth/complete');
    (status === UserStatus.REQUIRE_AUTH) && navigate('/auth/login');
  }, [status]);

  return <>verify</>;
}

export default Verify;