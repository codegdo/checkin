import React from 'react';
type BlockProps = {
  type?: "div"
}
export const Block: React.FC<BlockProps> = ({ type, children }): JSX.Element => {
  return React.createElement(`${type}`, null, children)
}