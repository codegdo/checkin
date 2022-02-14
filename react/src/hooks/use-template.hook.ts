import { useSelector } from 'react-redux';
import { AppState } from '../store/reducers';

import { templates } from '../components/template/template.layout';
import { TemplateProps } from '../components';
import { useMemo } from 'react';

export const useTemplate = ({ route, page }: TemplateProps): string => {
  const { session } = useSelector((state: AppState) => state);
  const { loggedIn } = session;

  console.log('OUT', route);

  return useMemo(() => {
    console.log('IN', page);

    let template = `<Content {...props} />`;

    if (loggedIn) {
      const type = session.user?.roleType as string;
      template = (templates as Record<string, string>)[type];
    } else {
      template = templates.base;
    }

    return template;
  }, [page]);
};
