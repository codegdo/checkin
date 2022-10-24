import React, { FC, PropsWithChildren } from 'react';

export const BoxMain: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return <main>{children}</main>
}