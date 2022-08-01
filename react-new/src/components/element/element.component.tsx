import React from 'react';

export const Button: React.FC<any> = ({ onCallback }): JSX.Element => {

  const handleClick = () => {
    console.log('click');
    onCallback && onCallback();
  }

  return <button onClick={handleClick}>Button</button>
}