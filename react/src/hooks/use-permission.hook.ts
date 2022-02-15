import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TemplateProps } from '../components';
import { AppState } from '../store/reducers';

export const usePermission = ({ route, page }: TemplateProps): string => {
  const { nav, session } = useSelector((state: AppState) => state);
  const { isLogin } = session;
  const { modules } = nav;
  console.log('accessOUT', route);

  return useMemo(() => {
    console.log('accessIN', page);

    let access = 'allow';

    if (isLogin) {
      if (route !== 'auth') {
        // check nav
        if (!(modules as Record<string, any>)[route as string] && route !== 'home') {
          access = 'deny';
        } else {
          // check policy
        }
      } else {
        //
      }
    }

    return access;
  }, []);
};
