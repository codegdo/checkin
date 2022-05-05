import { useSelector } from 'react-redux';
import { AppState } from '../store/reducers';

import { templates } from '../components/template/template.layout';
import { TemplateProps } from '../components';
import { useMemo } from 'react';
import { stringTemplate, TemplateData } from '../helpers';

export const useTemplate = ({ route, page }: TemplateProps): TemplateData => {
  const { user } = useSelector((state: AppState) => state.session);

  console.log('ROUTE:', route);

  return useMemo(() => {
    console.log('PAGE:', page);

    let template = `<Content {...props} />`;

    if (user) {
      const type = user?.groupType as string;
      const defaultTemplate = (templates as Record<string, string>)[type];

      template = defaultTemplate;
    } else {
      template = templates.base;
    }

    return stringTemplate(template);
  }, [page]);
};
