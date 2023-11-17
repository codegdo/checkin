import React, { Suspense } from 'react';
import { ComponentProps } from './loader.type';

export function LoaderPartial(Component: React.FC<ComponentProps>) {
  return (props: ComponentProps) => {
    console.log(props);
    return (
      <Suspense fallback="loading">
        <Component {...props} />
      </Suspense>
    );
  };
}