import React, { ComponentType, lazy, Suspense, useLayoutEffect, useMemo } from 'react';
import JsxParser from 'react-jsx-parser';

import { useTemplate, useAuthorize, useTracking } from '../../hooks';
import * as Navs from '../nav';
import UnAuthorize from '../page/unauthorize.page';
import { AdminRedirect, HomeRedirect } from '../redirect';

export type TemplateProps = {
  route?: string;
  page: string;
}

export const lazyLoad = <T extends ComponentType<{}>>(factory: () => Promise<{ default: T }>, minLoadTimeMs = 0): React.LazyExoticComponent<T> => {
  return lazy(() => {
    return Promise.all([factory(), new Promise((resolve) => setTimeout(resolve, minLoadTimeMs))]).then(([moduleExports]) => moduleExports);
  });
}

export const Template = (Component: React.FC<TemplateProps | {}>) => (props: TemplateProps): JSX.Element | null => {
  const { route, page } = props;
  const { template, fallback } = useTemplate(props);
  const [setTracking] = useTracking(route, page);
  const { isPublic, hasAccess, requireLocation, requireOrg } = useAuthorize(props);

  console.log('ISPUBLIC', isPublic);

  if (!isPublic) {
    if (!hasAccess) {
      Component = UnAuthorize;
    }

    if (requireOrg) {
      Component = AdminRedirect;
    }

    if (requireLocation) {
      Component = HomeRedirect;
    }
  }

  const jsxTemplate = useMemo(() => {

    setTracking();

    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{ props: { ...props, hasAccess } }}
      components={{ Content: Component, ...Navs }}
      jsx={template} />
  }, []);

  const jsxFallback = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{ props }}
      components={{ ...Navs }}
      jsx={fallback} />
  }, []);

  return <Suspense fallback={jsxFallback}>
    {jsxTemplate}
  </Suspense>
};

