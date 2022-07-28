import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TemplateProps } from '../components';
import { AppState } from '../store/reducers';

export const useAuthorize = ({
  route = '',
  page = '',
}: TemplateProps): { [key: string]: boolean } => {
  const { nav, policy, session } = useSelector((state: AppState) => state);
  const { user, locationId } = session;
  const { modules = {}, views = {} } = nav;

  const isPublic = ['auth'].includes(route);
  const module = modules[route] || ['/', 'home'].includes(route);
  const view = views[page];

  const auth = {
    isPublic,
    hasAccess: false,
    requireLocation: false,
    requireOrg: false,
    requireUserVerified: false,
    requireUserSetupCompleted: false,
  };

  return useMemo(() => {
    if (isPublic) {
      auth.hasAccess = true;

      if (user) {
        const { isActive, orgId } = user;

        if (!isActive && !orgId) {
          auth.requireUserVerified = true;
        }

        if (isActive && !orgId) {
          auth.requireUserSetupCompleted = true;
        }
      }
    } else {
      if (user) {
        const { groupType, orgId, isActive } = user;

        if (isActive) {
          if (module) {
            auth.hasAccess = true;
          }

          if (groupType == 'system') {
            auth.hasAccess = true;

            if (orgId == null && route !== 'admin') {
              auth.requireOrg = true;
            }
          } else {
            if (locationId == null && route !== '/') {
              auth.requireLocation = true;
            }
          }
        }
      }
    }
    return auth;
  }, []);
};
