import { FC } from 'react';
import { Partial, ComponentProps } from '../layout';

export const LoaderPartial = (Component: FC<ComponentProps>) => {
  return function Loader(props: ComponentProps) {
    return <Partial partialProps={props} Component={Component} />
  }
}