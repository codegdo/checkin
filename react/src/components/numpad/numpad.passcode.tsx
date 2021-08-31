import React, { useContext } from 'react';

import { NumPadContext } from './numpad.component';
import { NumPadInputProps } from './numpad.type';

export const NumPadPasscode: React.FC<NumPadInputProps> = ({ className = 'numpad-input' }): JSX.Element => {

  const context = useContext(NumPadContext);

  if (!context) {
    throw new Error('Require PASSCODE Nested In NUMPADCONTEXT');
  }

  const { digit, counter = 0 } = context;

  return <div className={className}>
    <span>
      {
        [...Array(digit)].map((_x, i) => {
          return <i key={i} className={((i + 1) <= counter) ? 'checked' : ''}></i>
        })
      }
    </span>
  </div>
}