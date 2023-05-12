import React, { useEffect, useState, ChangeEvent } from 'react';
import { Input } from '../input';
import { ControlData } from './control.type';

interface ControlTextProps extends ControlData { };

export function ControlText({ name, value, isReset, onChange }: ControlTextProps) {

    return (
        <div>
            <Input type='text' name={name} value={value} isReset={isReset} onChange={onChange} />
        </div>
    );
}