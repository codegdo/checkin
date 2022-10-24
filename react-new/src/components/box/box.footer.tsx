import React, { FC, PropsWithChildren } from 'react';

export const BoxFooter: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return <footer>{children}</footer>
}