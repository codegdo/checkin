import React, { FC } from 'react';

const data = {
  id: 1,
  version: '1.0',
  statement: [
    {
      effect: 'allow',
      actions: ['user:createUser'],
      access: ['username:write'],
      resource: ['setup::user/*']
    }
  ]
};

const PolicyForm: FC = (): JSX.Element => {
  return <>policy form</>
};

export default PolicyForm;