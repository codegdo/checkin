import React, { Suspense } from 'react';
import { TemplateProps } from './template.type';

export function Partial(Component: React.FC<TemplateProps>) {
  return (props: TemplateProps) => {
    return (
      <Suspense fallback="loading">
        <Component {...props} />
      </Suspense>
    );
  };
}