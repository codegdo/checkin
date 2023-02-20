import React, { } from 'react';
import { useRedirect } from '../../../hooks';


const Verify: React.FC = (): JSX.Element => {
  useRedirect();

  return <>verify</>;
}

export default Verify;