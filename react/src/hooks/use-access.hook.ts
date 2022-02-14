import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TemplateProps } from '../components';
import { AppState } from '../store/reducers';

export const useAccess = ({ route, page }: TemplateProps): string[] => {
  const { nav, session } = useSelector((state: AppState) => state);
  const { loggedIn } = session;
  const { modules } = nav;
  console.log('accessOUT', route);

  return useMemo(() => {
    console.log('accessIN', page);

    const access = [];

    if (loggedIn) {
      if (route !== 'auth') {
        // check nav
        if (!(modules as Record<string, any>)[route as string]) {
          access.push('deny');
        } else {
          // check policy
          access.push('all');
        }
      } else {
        access.length = 0;
      }
    }
    return access;
  }, []);
};
