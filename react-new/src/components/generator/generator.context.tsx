import React, { FC, PropsWithChildren } from 'react';

export const GeneratorProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return <>{
    children
  }</>
}