import React, { FC, PropsWithChildren } from 'react';

export const BoxFooter: FC<PropsWithChildren<{ className: string }>> = ({ className = '', children }): JSX.Element => {
  return <footer className={className}>{children}</footer>
}