import React, { Suspense, useMemo } from 'react';
import JsxParser from 'react-jsx-parser';

import * as Navs from '../nav';

export type TemplateProps = {
  component: React.ExoticComponent<any>;
  name: string;
}

export const Template: React.FC<TemplateProps> = (props): JSX.Element => {

  const Content = (props: any) => <props.component {...props} />;

  const jsxTemplate = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{ props }}
      components={{ Content, ...Navs }}
      jsx={'<NavMain {...props}/><Content {...props} />'} />
  }, []);

  return <Suspense fallback={''}>{jsxTemplate}</Suspense>;
};