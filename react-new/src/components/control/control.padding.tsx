import React, { FC } from 'react';
import { useToggle } from '../../hooks';
import { Input } from '../input';

const style = {
  field: {
    fontSize: '10px'
  },
  label: {
    fontSize: '5px;'
  }
}

export const ControlPadding: FC = (): JSX.Element => {
  const [toggle, setToggle] = useToggle();

  const handleChange = () => {
    setToggle(!toggle);
    const keys = 'field.fontSize'.split('.');

    const a = keys.reduce((a, k, i) => {
      const { style, ref } = a;

      const lastIndex = keys.length - 1 == i;

      if (ref && ref[k] && lastIndex) {
        ref[keys[i]] = '100px';
      }

      return { ...a, ref: style[k] || null };

    }, { style, ref: null });

    console.log(a, style);
  }

  return <div>
    <Input type="checkbox" name="checkbox" onChange={handleChange} />

    <div style={{ display: `${toggle ? 'none' : ''}` }}>
      <Input type="range" name="range" />
    </div>

  </div>
}