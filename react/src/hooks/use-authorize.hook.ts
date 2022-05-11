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

/*
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TemplateProps } from '../components';
import { AppState } from '../store/reducers';

export const useAuthorize = ({ route = '', page = '' }: TemplateProps): { [key: string]: boolean } => {
  const { nav, policy, session } = useSelector((state: AppState) => state);
  const { user } = session;
  const { modules = {}, views = {} } = nav;

  //const match = ['auth', 'home'].includes(route);
  const module = modules[route] || ['home'].includes(route);
  const view = views[page];

  const auth = {
    hasAccess: false,
    hasSystemOrg: false
  }

  return useMemo(() => {
    if (route == 'auth') {
      auth.hasAccess = true;
      auth.hasSystemOrg = true;
      return auth
    }

    if (user) {
      const { groupType, orgId } = user;

      if (module) {
        auth.hasAccess = true;
      }

      if (groupType == 'system') {
        auth.hasAccess = true;

        if (orgId == null && route == 'admin') {
          auth.hasSystemOrg = true;
        }
      }
    }

    return auth
  }, []);
};

*/
/*
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
*/
