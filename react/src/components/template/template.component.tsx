import React, { Suspense, useMemo } from 'react';
import JsxParser from 'react-jsx-parser';
import { useTemplate } from '../../hooks/use-template';

import * as Navs from '../nav';

type TemplateProps = {
  page: string;
}

export const Template = (Content: React.FC<TemplateProps>) => (props: TemplateProps): JSX.Element => {
  const { page } = props;
  const { template } = useTemplate();
  const components: any = { Content, ...Navs };

  const jsxTemplate = useMemo(() => {
    return <JsxParser
      allowUnknownElements={false}
      renderInWrapper={false}
      bindings={{ props }}
      components={{ ...components }}
      jsx={template} />
  }, [page]);

  return <Suspense fallback={''}>{jsxTemplate}</Suspense>;
};