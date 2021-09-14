import React from 'react';
import { NumPadPhone } from "./numpad.phone";
import { NumPadPasscode } from './numpad.passcode';

export const NumPadInput: React.FC<any> = ({ type }): JSX.Element | null => {

  switch (type) {
    case 'phone': return <NumPadPhone />;
    case 'passcode': return <NumPadPasscode />;
    default: return null;
  }
}