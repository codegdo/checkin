import React from 'react';

import { TBody } from './table.body';
import { THead } from './table.head';

export const Table: React.FC = ({ children }): JSX.Element | null => {

  return <table>
    <THead>{children}</THead>
    <TBody>{children}</TBody>
  </table>

}