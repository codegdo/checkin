import React, { useContext } from 'react';
import { GridViewKey } from './gridview.key';
import { RowContext } from './table.tr';

export const TData: React.FC<any> = (props): JSX.Element => {

  const rowContext = useContext(RowContext);

  if (!rowContext) {
    throw new Error('Required CONTEXT');
  }

  const { dataRow } = rowContext;

  const { name, isKey } = props;
  const text = String(dataRow[name]);

  return isKey ? <td><GridViewKey {...props} /></td> : <td>{text}</td>
}