import React, { FC } from 'react';
import { Render } from './dragdrop.render';

export const DragDropBlock: FC<any> = ({ data, children }): JSX.Element => {
  return <>{children ? children : <Render data={[...data]} />}</>
};
