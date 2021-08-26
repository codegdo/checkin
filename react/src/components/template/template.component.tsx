import React, { Suspense, useMemo } from 'react';
import JsxParser from 'react-jsx-parser';

import * as Navs from '../nav';

export type TemplateProps = {
  page: string;
}

export const Template = (Content: React.FC<TemplateProps>) => (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & TemplateProps): JSX.Element => {
  const { page } = props;
  //const Content = (props: any) => <props.component {...props} />;
  const components: any = { Content, ...Navs };

  const jsxTemplate = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{ props }}
      components={{ ...components }}
      jsx={'<NavMain {...props}/><Content {...props} />'} />
  }, [page]);

  return <Suspense fallback={''}>{jsxTemplate}</Suspense>;
};