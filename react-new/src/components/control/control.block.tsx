import React, { FC } from 'react';
import { ControlRender } from './control.render';

export const ControlBlock: FC<any> = ({ data, ...props }): JSX.Element => {
  return <div>
    {
      <ControlRender data={data} />
    }
  </div>
}