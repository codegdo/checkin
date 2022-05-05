import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TemplateProps } from '../components';
import { AppState } from '../store/reducers';

export const useAuthorize = ({ route = '', page = '' }: TemplateProps): boolean => {
  const { nav, policy, session } = useSelector((state: AppState) => state);
  const { user } = session;
  const { modules = {}, views = {} } = nav;

  return useMemo(() => {

    if (user) {
      const match = ['auth', 'home'].includes(route);
      const found = modules[route];
      const view = views[page];

      if (!match && !found) {
        return false;
      }

    }

    return true;
  }, []);
};
