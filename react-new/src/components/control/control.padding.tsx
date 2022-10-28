import React, { FC } from 'react';
import { useToggle } from '../../hooks';
import { Input } from '../input';

export const ControlPadding: FC = (): JSX.Element => {
  const [toggle, setToggle] = useToggle();

  const handleChange = () => {
    setToggle(!toggle);
  }

  return <div>
    <Input type="checkbox" name="checkbox" onChange={handleChange} />
    <div style={{ display: `${toggle ? 'none' : ''}` }}>
      <Input type="range" name="range" />
    </div>

  </div>
}