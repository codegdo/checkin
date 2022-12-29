import React, { FC } from 'react';
import { GeneratorProvider } from './generator.context';
import { GeneratorRender } from './generator.render';

export const Generator: FC = (): JSX.Element => {
  return <>
    <GeneratorProvider>
      <GeneratorRender />
    </GeneratorProvider>
  </>
}