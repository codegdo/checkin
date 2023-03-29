import React, { useEffect, useState, ChangeEvent } from 'react';
import { Input } from '../input';
import { ControlData } from './control.type';

interface ControlTextProps extends ControlData { };

export function ControlText({ name, value, onChange }: ControlTextProps) {

    return (
        <div>
            <Input type='text' name={name} value={value} onChange={onChange} />
        </div>
    );
}