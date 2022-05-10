import React, { ComponentType, lazy as _lazy, Suspense, useLayoutEffect, useMemo } from 'react';
import JsxParser from 'react-jsx-parser';

import { useTemplate, useAuthorize } from '../../hooks';
import * as Navs from '../nav';
// *require import as default
import UnAuthorize from '../page/unauthorize.page';
import AdminRedirect from '../page/admin-redirect.page';

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
  const { hasAccess, hasSystemOrg } = useAuthorize(options);

  if (!hasAccess) {
    Component = UnAuthorize;
  }

  if (!hasSystemOrg) {
    Component = AdminRedirect;
  }

  //const Content = hasAccess ? (hasOrg ? Component : AdminRedirect) : UnAuthorize;

  console.log('TEMPLATE HAS ACCESS', hasAccess);
  console.log('TEMPLATE HAS ORG', hasSystemOrg);

  useLayoutEffect(() => {
    const pageId = route ? `${route}_${page}` : page;
    document.body.setAttribute('data-view', pageId);
  }, [page]);

  const jsxTemplate = useMemo(() => {
    const components: any = { Content: Component, ...Navs };
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

