import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LoginData } from './login.api';
import { AppState } from '../../../store/reducers';
import { useAction } from '../../../hooks';
import { AppStatus } from '../../../constants';

export const useLogin = <T extends LoginData>(): [
  string | undefined,
  (data?: T) => void
] => {
  const { status } = useSelector((state: AppState) => state.session);
  const { updateSession, updateUser } = useAction();

  const navigate = useNavigate();

  useEffect(() => {
    // alert();
    status === AppStatus.ACTIVE && navigate('/');
    status === AppStatus.REQUIRE_VERIFY && navigate('/auth/verify');
    status === AppStatus.REQUIRE_VERIFY_COMPANY && navigate('/auth/setup');
  }, [status]);

  const callback = useCallback((data?: T) => {
    if (data) {
      const { status, user } = data;
      updateSession({ status });
      updateUser(user);
    }
  }, []);

  return [status, callback];
};
