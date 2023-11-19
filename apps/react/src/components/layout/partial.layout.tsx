import { FC, Suspense } from 'react';
import { TemplateProps } from './template.layout';

export interface PartialProps extends TemplateProps {}

interface PartialLayoutProps {
  partialProps: PartialProps;
  Component: FC<PartialProps>;
}

export function PartialLayout({ partialProps, Component }: PartialLayoutProps) {
  return (
    <Suspense fallback="loading">
      <Component {...partialProps} />
    </Suspense>
  );
}
