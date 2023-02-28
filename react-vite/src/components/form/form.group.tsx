import React, { PropsWithChildren } from 'react';
import { FormRender } from './form.render';

interface BlockProps extends PropsWithChildren {
  data?: any
}

const FormGroup: React.FC<BlockProps> = ({ children, data }): JSX.Element => {
  return <div>
    {
      children ? children : <FormRender data={data} />
    }
  </div>
}

export default FormGroup;