import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { UserStatus } from '../../../constants';

const Verify: React.FC = (): JSX.Element => {
  const { status } = useSelector((state: AppState) => state.session);

  const navigate = useNavigate();
  const { mutate: submitVerify } = useFetch('/api/auth/verify');

  useEffect(() => {
    (status === UserStatus.ACTIVE) && navigate('/');
    (status === UserStatus.REQUIRE_SETUP_ACCOUNT) && navigate('/auth/setup');
    (status === UserStatus.NOT_FOUND) && navigate('/auth/login');
  }, [status]);

  return <>verify</>;
}

export default Verify;