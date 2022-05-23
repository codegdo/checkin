import React, { ComponentType, lazy as _lazy, Suspense, useLayoutEffect, useMemo } from 'react';
import JsxParser from 'react-jsx-parser';

import { useTemplate, useAuthorize } from '../../hooks';
import * as Navs from '../nav';
// *require import as default
import UnAuthorize from '../page/unauthorize.page';
import AdminRedirect from '../page/admin-redirect.page';
import HomeRedirect from '../page/home-redirect.page';

export type TemplateProps = {
  route?: string;
  page: string;
}

export const lazy = <T extends ComponentType<any>>(factory: () => Promise<{ default: T }>, minLoadTimeMs = 0): React.LazyExoticComponent<T> => {
  return _lazy(() => {
    return Promise.all([factory(), new Promise((resolve) => setTimeout(resolve, minLoadTimeMs))]).then(([moduleExports]) => moduleExports);
  });
}

export const Template = (Component: React.FC<TemplateProps>) => (options: TemplateProps): JSX.Element | null => {
  const { route, page } = options;
  const { template, fallback } = useTemplate(options);
  const { isPublish, hasAccess, requiredLocation, requiredOrg } = useAuthorize(options);

  if (!isPublish) {
    if (!hasAccess) {
      Component = UnAuthorize;
    }

    if (requiredOrg) {
      Component = AdminRedirect;
    }

    if (requiredLocation) {
      Component = HomeRedirect;
    }
  }

  console.log('TEMPLATE HAS ACCESS', hasAccess);
  console.log('TEMPLATE REQUIRED LOCATION', requiredLocation);
  console.log('TEMPLATE REQUIRED ORG', requiredOrg);

  useLayoutEffect(() => {
    document.body.setAttribute('data-view', `${route}_${page}`);
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

