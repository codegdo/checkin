import { FC, Suspense } from 'react';
import { ComponentProps } from './type';

interface PartialProps {
  routeContext: ComponentProps;
  Component: FC<ComponentProps>;
}

export function Partial({ routeContext, Component }: PartialProps) {
  return (
    <Suspense fallback="loading">
      <Component {...routeContext} />
    </Suspense>
  );
}
