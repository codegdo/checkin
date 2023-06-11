import React, { Suspense } from 'react';
import { TemplateProps } from './types';

const PartialLoader = (Component: React.FC<TemplateProps>) => (props: TemplateProps): JSX.Element => {
  return <Suspense fallback={'loading'}>
    <Component {...props} />
  </Suspense>
}

export default PartialLoader