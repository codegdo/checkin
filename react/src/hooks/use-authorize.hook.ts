import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TemplateProps } from '../components';
import { AppState } from '../store/reducers';

export const useAuthorize = ({
  route = '',
  page = '',
}: TemplateProps): { [key: string]: boolean } => {
  const { nav, policy, session } = useSelector((state: AppState) => state);
  const { user, locationId, orgId } = session;
  const { modules = {}, views = {} } = nav;

  const isPublic = ['auth'].includes(route);
  const module = modules[route] || ['/', 'home'].includes(route);
  const view = views[page];

  const authorize = {
    isPublic,
    hasAccess: false,
    hasLocation: true,
    hasOrg: true,
  };

  return useMemo(() => {
    if (isPublic) {
      authorize.hasAccess = true;
    } else {
      if (user && user.isActive) {

        if (module) {
          authorize.hasAccess = true;
        }

        if (orgId == null && route !== 'admin') {
          authorize.hasOrg = false;
        }

        if (locationId == null && route !== '/') {
          authorize.hasLocation = false;
        }

        /* if (user.groupType == 'system') {
          if (orgId == null && route !== 'admin') {
            authorize.requireOrg = true;
          }
        } else {
          if (locationId == null && route !== '/') {
            authorize.requireLocation = true;
          }
        } */
      }
    }

    return authorize;
  }, []);
};
