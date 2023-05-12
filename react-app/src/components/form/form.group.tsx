import React, { PropsWithChildren } from 'react';
import { FormRender } from './form.render';

interface BlockProps extends PropsWithChildren {
  data?: any
}

export function FormGroup({ children, data }: BlockProps) {
  return <div>
    {
      children ? children : <FormRender data={data} />
    }
  </div>
}
