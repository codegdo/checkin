import React, { useContext } from 'react';

import { NumPadContext } from './numpad.component';
import { NumPadInputProps } from './numpad.type';

export const NumPadPhone: React.FC<NumPadInputProps> = ({ className = 'numpad-input' }): JSX.Element => {

  const context = useContext(NumPadContext);

  if (!context) {
    throw new Error('Require NUMPADINPUT Nested In NUMPADCONTEXT');
  }

  const { ref, value, placeholder, keypress, handleKeyDown } = context;

  return <div className={className}>
    <input
      ref={ref}
      value={value}
      placeholder={placeholder}
      readOnly={!keypress}
      onChange={() => null}
      onKeyDown={(event) => { if (keypress) handleKeyDown(event) }} />
  </div>
}