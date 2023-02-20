import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppStatus } from '../constants';
import { AppState } from '../store/reducers';

export const useRedirect = () => {
  const { status } = useSelector((state: AppState) => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    status === AppStatus.UNAUTHENTICATED && navigate('/auth/login');
    status === AppStatus.REQUIRE_VERIFY && navigate('/auth/verify');
    status === AppStatus.REQUIRE_VERIFY_COMPANY &&
      navigate('/auth/verify-company');
    status === AppStatus.ACTIVE && navigate('/');
  }, [status]);
};
