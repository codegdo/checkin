import { FC } from 'react';
import { PartialLayout, PartialProps } from '../layout/partial.layout';

export const LoaderPartial = (Component: FC<PartialProps>) => (props: PartialProps) => (
  <PartialLayout partialProps={props} Component={Component} />
);