import React, { ComponentType, lazy as _lazy, Suspense, useLayoutEffect, useMemo } from 'react';
import JsxParser from 'react-jsx-parser';

import { useTemplate, useAuthorize } from '../../hooks';
import * as Navs from '../nav';
import UnAuthorize from '../page/unauthorize.page';

export type TemplateProps = {
  route?: string;
  page: string;
}

export const lazy = <T extends ComponentType<any>>(factory: () => Promise<{ default: T }>, minLoadTimeMs = 0): React.LazyExoticComponent<T> => {
  return _lazy(() => {
    return Promise.all([factory(), new Promise((resolve) => setTimeout(resolve, minLoadTimeMs))]).then(([moduleExports]) => moduleExports)
  });
}


export const Template = (Component: React.FC<TemplateProps>) => (options: TemplateProps): JSX.Element | null => {
  const { route, page } = options;
  const { template, fallback } = useTemplate(options);
  const hasAccess = useAuthorize(options);

  const Content = hasAccess ? Component : UnAuthorize;

  useLayoutEffect(() => {
    const pageId = route ? `${route}_${page}` : page;
    document.body.setAttribute('data-view', pageId);
  }, [page]);

  const jsxTemplate = useMemo(() => {
    const components: any = { Content, ...Navs };
    const props = { ...options, hasAccess }

    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{ props }}
      components={{ ...components }}
      jsx={template} />
  }, []);

  return <Suspense fallback={<JsxParser renderInWrapper={false} jsx={fallback} />}>{jsxTemplate}</Suspense>;
};

