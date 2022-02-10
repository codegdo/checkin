import { useSelector } from 'react-redux';
import { AppState } from '../store/reducers';

import { templates } from '../components/template/template.layout';

interface TemplateData {
  template: string
}

export const useTemplate = (page: string): TemplateData => {
  const { layout, session } = useSelector((state: AppState) => state);
  let template = `<Content {...props} />`;

  if (session.loggedIn) {
    const type = session.user?.roleType as string;

    template = (templates as Record<string, string>)[type];
  } else {
    template = templates.base;
  }


  return { template }
}