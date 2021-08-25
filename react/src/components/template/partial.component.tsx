import React, { Suspense } from 'react';

type PartialProps = {
  page?: string;
}

export const Partial = (Component: React.FC<PartialProps>) => (props: PartialProps): JSX.Element => {
  return <Suspense fallback={''}>
    <Component {...props} />
  </Suspense>
}