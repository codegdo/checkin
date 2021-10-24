import { useNavigate } from 'react-router-dom';
import { useAction } from './use-action.hook';
import { useFetch } from './use-fetch.hook';

export const useLogout = (redirect?: string): any => {
  const [_, fetchLogout] = useFetch('/api/auth/logout');
  const { deleteSession } = useAction();
  const navigate = useNavigate();

  const logout = async () => {
    void (await fetchLogout());
    deleteSession();
    redirect && navigate(redirect);
  };

  return logout;
};
