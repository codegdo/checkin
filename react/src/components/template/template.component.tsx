import React, { Suspense, useLayoutEffect, useMemo } from 'react';
import JsxParser from 'react-jsx-parser';
import { useTemplate, usePermission } from '../../hooks';


import * as Navs from '../nav';
import UnAuthorize from '../page/unauthorize.page';

export type TemplateProps = {
  route?: string;
  page: string;
}

export const Template = (Component: React.FC<TemplateProps>) => (options: TemplateProps): JSX.Element | null => {
  const { route, page } = options;
  const template = useTemplate(options);
  const access = usePermission(options);
  //const Content = (access.indexOf('deny') !== -1) ? UnAuthorize : Component;
  const Content = (access == 'deny') ? UnAuthorize : Component;

  useLayoutEffect(() => {
    const pageId = route ? `${route}_${page}` : page;
    document.body.setAttribute('data-view', pageId);
  }, [page]);

  const jsxTemplate = useMemo(() => {
    const components: any = { Content, ...Navs };
    const props = { ...options, access }

    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{ props }}
      components={{ ...components }}
      jsx={template} />
  }, [Content]);

  return <Suspense fallback={''}>{jsxTemplate}</Suspense>;
};

