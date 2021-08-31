import React from 'react';
import { NumPadInput } from "./numpad.input";
import { NumPadPasscode } from './numpad.passcode';

export const NumPadRender: React.FC<any> = ({ type }): JSX.Element | null => {
  switch (type) {
    case 'phone': return <NumPadInput />;
    case 'passcode': return <NumPadPasscode />;
    default: return <NumPadInput />
  }
}