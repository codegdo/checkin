import React from 'react';
import { Input } from '../input';
import { ControlData } from './control.type';

interface ControlRangeProps extends ControlData {};
export function ControlRange({ name, value, onChange }:ControlRangeProps) {
    return (
    <div>
        <Input type='range' name={name} value={value} defaultValue='16' onChange={onChange} />
    </div>
    );
}