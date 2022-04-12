import React from 'react';

export const ControlButton: React.FC<any> = (): JSX.Element => {

  return <>
    <button type="button" name="search">Search</button>
    <button type="button" name="clear">Clear</button>
  </>
}