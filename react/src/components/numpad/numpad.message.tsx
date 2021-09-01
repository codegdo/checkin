import React from "react";
import { useContext } from "react";
import { NumPadContext } from "./numpad.component";
import { NumPadMessageProps } from "./numpad.type";

export const NumPadMessage: React.FC<NumPadMessageProps> = ({ className = 'numpad-message' }): JSX.Element => {
  const context = useContext(NumPadContext);

  if (!context) {
    throw new Error('Require MESSAGE Nested In NUMPADCONTEXT');
  }

  const { message } = context;

  return <div className={className}><p>{message}</p></div>
}