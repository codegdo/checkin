import React, { FC, PropsWithChildren } from 'react';

export const PanelFooter: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return <footer>{children}</footer>
}