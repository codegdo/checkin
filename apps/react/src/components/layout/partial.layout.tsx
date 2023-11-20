import { FC, Suspense } from 'react';
import { ComponentProps } from './type';

interface PartialProps {
  partialProps: ComponentProps;
  Component: FC<ComponentProps>;
}

export function Partial({ partialProps, Component }: PartialProps) {
  return (
    <Suspense fallback="loading">
      <Component {...partialProps} />
    </Suspense>
  );
}
