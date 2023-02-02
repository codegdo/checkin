import React, { useEffect, useState } from 'react';

export const InputCheckbox: React.FC<any> = ({ onChange }): JSX.Element => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    console.log('CHECKED', checked);
    onChange && onChange();
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setChecked(target.checked);
  }

  return <label className={`switch ${checked ? '-on' : ''}`}>
    <input type='checkbox' defaultValue={'test'} checked={checked} onChange={handleChange} />
  </label>
}