import React, { ReactNode } from 'react';

import { TBody } from './table.body';
import { THead } from './table.head';

export const Table: React.FC<{ children: ReactNode | undefined }> = ({ children }): JSX.Element | null => {

  return <table>
    <THead>{children}</THead>
    <TBody>{children}</TBody>
  </table>

}