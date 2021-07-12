import React, { Suspense, useMemo } from 'react';
import JsxParser from 'react-jsx-parser';

export const Template: React.FC<{
  component: React.LazyExoticComponent<any>
}> = ({ component: Component }): JSX.Element => {

  const Content = (props: any) => <Component {...props} />;

  const jsxTemplate = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{}}
      components={{ Content }}
      jsx={'<Content />'} />
  }, []);

  return <Suspense fallback={''}>{jsxTemplate}</Suspense>;
};