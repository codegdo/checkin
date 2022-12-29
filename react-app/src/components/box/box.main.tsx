import React, { FC, PropsWithChildren } from 'react';

export const BoxMain: FC<PropsWithChildren<{ className: string }>> = ({ className = '', children }): JSX.Element => {
  return <main className={className}>{children}</main>
}