import React, { useContext } from 'react';
import { NumPadContext } from './numpad.component';
import { NumPadKeyProps } from './numpad.type';

export const NumPadKey: React.FC<NumPadKeyProps> = ({ className = 'numpad-key' }): JSX.Element => {
  const context = useContext(NumPadContext);

  if (!context) {
    throw new Error('Require NUMPADKEY Nested In NUMPADCONTEXT');
  }

  const { type, counter = 0, handleClick } = context;

  return <div className={className}>
    <div>
      <button type="button" name="key" value="1" onClick={e => handleClick(e)}>1</button>
      <button type="button" name="key" value="2" onClick={e => handleClick(e)}>2</button>
      <button type="button" name="key" value="3" onClick={e => handleClick(e)}>3</button>
    </div>
    <div>
      <button type="button" name="key" value="4" onClick={e => handleClick(e)}>4</button>
      <button type="button" name="key" value="5" onClick={e => handleClick(e)}>5</button>
      <button type="button" name="key" value="6" onClick={e => handleClick(e)}>6</button>
    </div>
    <div>
      <button type="button" name="key" value="7" onClick={e => handleClick(e)}>7</button>
      <button type="button" name="key" value="8" onClick={e => handleClick(e)}>8</button>
      <button type="button" name="key" value="9" onClick={e => handleClick(e)}>9</button>
    </div>
    <div>
      {
        <button className={type == 'passcode' ? (counter > 0 ? '' : 'invisible') : ''} type="button" name="clear" onClick={e => handleClick(e)}>delete</button>
      }
      <button type="button" name="key" value="0" onClick={e => handleClick(e)}>0</button>
      {
        <button className={type == 'passcode' ? 'invisible' : ''} type="button" name="enter" onClick={e => handleClick(e)}>enter</button>
      }

    </div>
  </div>
}