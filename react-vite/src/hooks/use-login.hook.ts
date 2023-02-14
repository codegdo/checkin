import { useCallback, useState } from 'react';
import { LoginData } from '../views/auth/login/login.type';
import { useAction } from './use-action.hook';

// user-pending
// user-incomplete
// user-trial
// user-expire
// user-active
// user-inactive
// user-disabled

export const useLogin = () => {
  const { updateSession } = useAction();
  const [status, setStatus] = useState('');
  const loggedIn = status == 'user-active' || status == 'user-trial';

  const callback = useCallback(<T extends LoginData>(data: T) => {
    const { user } = data;
    const { isActive, accountId } = user;

    updateSession({ loggedIn: true, user });
    setStatus('user-active');
  }, []);

  return { status, loggedIn, callback };
};
