import { useEffect, useState } from 'react';
import { useAction } from './use-action.hook';
import { useFetch } from './use-fetch.hook';

export const useLogout = (): [string, () => void] => {
  const [{ status }, getLogout] = useFetch('/api/auth/logout');
  const { deleteSession } = useAction();

  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (status == 'success' || status == 'error') {
      deleteSession();
    }
  }, [status]);

  useEffect(() => {
    isLogout &&
      (async () => {
        await getLogout();
      })();
  }, [isLogout]);

  const logout = () => {
    setIsLogout(true);
  };

  return [status, logout];
};
