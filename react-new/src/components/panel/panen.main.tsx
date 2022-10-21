import React, { FC, PropsWithChildren } from 'react';

export const PanelMain: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return <main>{children}</main>
}