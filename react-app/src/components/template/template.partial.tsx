import React, { Suspense } from 'react';

type PartialProps = {
  route?: string;
  page: string;
}

export const Partial = (Component: React.FC<PartialProps>) => (props: PartialProps): JSX.Element => {
  return <Suspense fallback={'loading'}>
    <Component {...props} />
  </Suspense>
}