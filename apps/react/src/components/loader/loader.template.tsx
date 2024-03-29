import { FC } from 'react';
import { Template, ComponentProps } from '../layout';

export const LoaderTemplate = (Component: FC<ComponentProps>) => {
  return function Loader(props: ComponentProps) {
    return <Template routeContext={props} Component={Component} />
  }
};

