import React, { PropsWithChildren } from 'react';
import { Render } from './form.render';

interface BlockProps {
  data?: any
}

export const Block: React.FC<PropsWithChildren<BlockProps>> = ({ children, data }): JSX.Element => {
  return <div>
    {
      children ? children : data && <Render data={data} />
    }
  </div>
}