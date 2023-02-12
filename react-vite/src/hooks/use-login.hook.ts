import { useCallback, useState } from 'react';
import { useAction } from './use-action.hook';
// user-pending
// user-incomplete
// user-trial
// user-expire
// user-active
// user-inactive
// user-disabled

export const useLogin = <T extends { user: any }>() => {
  const { updateSession } = useAction();
  const [status, setStatus] = useState('');
  const loggedIn = status == 'user-active' || status == 'user-trial';

  const callback = useCallback((data: T) => {
    const { user } = data;

    updateSession({ user });
    setStatus('user-active');
  }, []);

  return { status, loggedIn, callback };
};
