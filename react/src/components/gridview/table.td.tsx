import React from 'react';
import { KeyColumn } from './gridview.keycolumn';

export const TD: React.FC<any> = (props): JSX.Element => {

  const { dataRow, name, isKey } = props;
  const text = String(dataRow[name]);

  return isKey ? <KeyColumn {...props} /> : <td>{text}</td>
}