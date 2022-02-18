import { useSelector } from 'react-redux';
import { AppState } from '../store/reducers';

import { templates } from '../components/template/template.layout';
import { TemplateProps } from '../components';
import { useMemo } from 'react';
import { stringTemplate, TemplateData } from '../helpers';

export const useTemplate = ({ route, page }: TemplateProps): TemplateData => {
  const { session } = useSelector((state: AppState) => state);
  const { isLogin } = session;

  console.log('OUT', route);

  return useMemo(() => {
    console.log('IN', page);

    let template = `<Content {...props} />`;

    if (isLogin) {

      const type = session.user?.roleType as string;
      const defaultTemplate = (templates as Record<string, string>)[type];

      template = defaultTemplate;
    } else {
      template = templates.base;
    }

    return stringTemplate(template);
  }, [page]);
};
