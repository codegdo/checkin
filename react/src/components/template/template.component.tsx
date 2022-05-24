import React, { ComponentType, lazy as _lazy, Suspense, useLayoutEffect, useMemo, useRef } from 'react';
import JsxParser from 'react-jsx-parser';

import { useTemplate, useAuthorize } from '../../hooks';
import * as Navs from '../nav';
import UnAuthorize from '../page/unauthorize.page';
import AdminRedirect from '../page/admin-redirect.page';
import HomeRedirect from '../page/home-redirect.page';
//import { Page } from './template.page';

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
  //const [fallback, setFallback] = React.useState<any>(null);

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

  useLayoutEffect(() => {
    document.body.setAttribute('data-view', `${route}_${page}`);
  }, [page]);

  const jsxTemplate = useMemo(() => {
    const components: any = { Content: Component, ...Navs };
    const props = { ...options, hasAccess };

    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{ props }}
      components={{ ...components }}
      jsx={template} />
  }, []);

  const jsxFallback = useMemo(() => {
    return <JsxParser renderInWrapper={false} jsx={fallback} />
  }, []);

  return <>
    <Suspense fallback={jsxFallback}>
      {jsxTemplate}
    </Suspense>
  </>
};

