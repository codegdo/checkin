import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppStatus } from '../constants';
import { AppState } from '../store/reducers';

export const useRedirect = () => {
  const current = useSelector((state: AppState) => state.current);
  const navigate = useNavigate();

  const redirect = useCallback((status: AppStatus | undefined) => {
    switch (status) {
      case AppStatus.REQUIRE_VERIFY:
        navigate('/auth/verify');
        break;
      case AppStatus.REQUIRE_VERIFY_COMPANY:
        navigate('/auth/verify-company');
        break;
      case AppStatus.ACTIVE:
        navigate('/');
        break;
      default:
        navigate('/auth/login');
    }
  }, []);

  useEffect(() => {
    redirect(current.appStatus);
  }, [current]);

};
