import React from 'react';
import { ControlPadding } from './control.padding';
import { ControlRange } from './control.range';
import { ControlText } from './control.text';
import { ControlData } from './control.type';

interface ControlProps extends ControlData {}

export function Control(props:ControlProps) {
  switch (props.type) {
    case 'padding': return <ControlPadding {...props} />;
    case 'range': return <ControlRange {...props} />;
    case 'text': return <ControlText {...props} />;
    default: return null;
  }
}