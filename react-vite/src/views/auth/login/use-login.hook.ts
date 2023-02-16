import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppState } from '../../../store/reducers';
import { UserStatus } from '../../../store/types';
import { LoginData } from './login.api';
import { useAction } from '../../../hooks';

export const useLogin = <T extends LoginData>(): [string | undefined, (data?: T) => void] => {
  const { status } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();

  const navigate = useNavigate();

  useEffect(() => {
    // alert();
    (status === UserStatus.ACTIVE) && navigate('/');
    (status === UserStatus.REQUIRE_VERIFY) && navigate('/auth/verify');
    (status === UserStatus.REQUIRE_SETUP_COMPLETE) && navigate('/auth/login');
  }, [status]);

  const callback = useCallback((data?: T) => {
    if (data) {
      const { status, user } = data;
      updateSession({ status, user });
    }
  }, []);

  return [status, callback];
};
