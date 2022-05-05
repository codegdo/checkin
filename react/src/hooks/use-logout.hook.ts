import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAction } from './use-action.hook';
import { useFetch } from './use-fetch.hook';

export const useLogout = (redirect?: string): any => {
  const [{ status }, fetchLogout] = useFetch('/api/auth/logout');
  const { deleteSession } = useAction();
  const navigate = useNavigate();

  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (status == 'success' || status == 'error') {
      redirect && navigate(redirect);
      deleteSession();
    }
  }, [status]);

  useEffect(() => {
    isLogout &&
      (async () => {
        await fetchLogout();
      })();
  }, [isLogout]);

  const logout = async () => {
    setIsLogout(true);
  };

  return [status, logout];
};
