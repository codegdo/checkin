import React, { useContext } from 'react';

import { NumPadContext } from './numpad.component';
import { NumPadInputProps } from './numpad.type';

export const NumPadInput: React.FC<NumPadInputProps> = ({ className = 'numpad-input' }): JSX.Element => {

  const context = useContext(NumPadContext);

  if (!context) {
    throw new Error('Require NUMPADINPUT Nested In NUMPADCONTEXT');
  }

  const { ref, type, value, digit, counter = 0, keypress, handleKeyDown } = context;

  return <div className={className}>
    {
      type === 'passcode' ? <span>
        {
          [...Array(digit)].map((_x, i) => {
            return <i key={i} className={((i + 1) <= counter) ? 'checked' : ''}></i>
          })
        }
      </span> : <input
        ref={ref}
        value={value}
        placeholder="••••"
        readOnly={!keypress}
        onChange={() => null}
        onKeyDown={(event) => { if (keypress) handleKeyDown(event) }} />
    }
  </div>
}