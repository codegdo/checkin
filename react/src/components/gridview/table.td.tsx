import React from 'react';

export const TD: React.FC<any> = ({ data, name }): JSX.Element => {
  return <td>{String(data[name])}</td>
}