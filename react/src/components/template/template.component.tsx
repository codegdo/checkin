import React, { Suspense, useMemo } from 'react';
import JsxParser from 'react-jsx-parser';

import * as Navs from '../nav';

type TemplateProps = {
  page: string;
}

export const Template = (Content: React.FC<TemplateProps>) => (props: TemplateProps): JSX.Element => {
  const { page } = props;
  const components: any = { Content, ...Navs };

  const jsxTemplate = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{ props }}
      components={{ ...components }}
      jsx={'<div class="admin"><NavMain {...props}/><Content {...props} /></div>'} />
  }, [page]);

  return <Suspense fallback={''}>{jsxTemplate}</Suspense>;
};