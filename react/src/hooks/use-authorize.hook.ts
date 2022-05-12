import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TemplateProps } from '../components';
import { AppState } from '../store/reducers';

export const useAuthorize = ({
  route = '',
  page = '',
}: TemplateProps): { [key: string]: boolean } => {
  const { nav, policy, session } = useSelector((state: AppState) => state);
  const { user } = session;
  const { modules = {}, views = {} } = nav;

  const isPublic = ['auth'].includes(route);
  const module = modules[route] || ['home'].includes(route);
  const view = views[page];

  const auth = {
    hasAccess: false,
    requiredOrg: false,
  };

  return useMemo(() => {
    if (isPublic) {
      auth.hasAccess = true;
      return auth;
    }

    if (user) {
      const { groupType, orgId } = user;

      if (module) {
        auth.hasAccess = true;
      }

      if (groupType == 'system') {
        auth.hasAccess = true;

        if (orgId == null && route !== 'admin') {
          auth.requiredOrg = true;
        }
      }
    }

    return auth;
  }, []);
};

