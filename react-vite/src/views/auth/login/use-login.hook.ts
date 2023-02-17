import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LoginData } from './login.api';
import { AppState } from '../../../store/reducers';
import { useAction } from '../../../hooks';
import { UserStatus } from '../../../constants';

export const useLogin = <T extends LoginData>(): [
  string | undefined,
  (data?: T) => void
] => {
  const { status } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();

  const navigate = useNavigate();

  useEffect(() => {
    // alert();
    status === UserStatus.ACTIVE && navigate('/');
    status === UserStatus.REQUIRE_VERIFY && navigate('/auth/verify');
    status === UserStatus.REQUIRE_COMPANY && navigate('/auth/setup');
  }, [status]);

  const callback = useCallback((data?: T) => {
    if (data) {
      const { status, user } = data;
      updateSession({ status, user });
    }
  }, []);

  return [status, callback];
};
