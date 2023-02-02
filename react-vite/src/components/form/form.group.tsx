import React, { PropsWithChildren } from 'react';
import { Render } from './form.render';

interface BlockProps {
  data?: any
}

export const Group: React.FC<PropsWithChildren<BlockProps>> = ({ children, data }): JSX.Element => {
  return <div>
    {
      children ? children : <Render data={data} />
    }
  </div>
}