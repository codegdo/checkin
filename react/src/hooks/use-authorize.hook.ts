import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TemplateProps } from '../components';
import { AppState } from '../store/reducers';

export const useAuthorize = ({ route = '', page = '' }: TemplateProps): { [key: string]: boolean } => {
  const { nav, policy, session } = useSelector((state: AppState) => state);
  const { user } = session;
  const { modules = {}, views = {} } = nav;

  const match = ['auth', 'home'].includes(route);
  const found = modules[route];
  const view = views[page];

  let hasAccess = true;
  let hasSystemOrg = true;

  return useMemo(() => {

    if (user) {
      if (!match && !found) {
        hasAccess = false;
      }

      if (user.groupType == 'system') {
        hasAccess = true;

        if (user.orgId == null && !['auth', 'admin'].includes(route)) {
          hasSystemOrg = false;
        }
      }
    }

    return { hasAccess, hasSystemOrg };
  }, []);
};
