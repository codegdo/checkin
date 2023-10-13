import React, { Suspense } from 'react';
import { TemplateProps } from './types';

function Partial(Component: React.FC<TemplateProps>) {
  return function PartialLoader(props: TemplateProps) {
    return (
      <Suspense fallback="loading">
        <Component {...props} />
      </Suspense>
    );
  };
}

export default Partial;