import React from 'react';
import { LabelProps } from './input.type';

export function Label({ className, label, description, styles }: LabelProps) {
  return <>
    {
      (label || description) &&
      <div>
        {label && <label className='label' style={styles?.label}>{label}</label>}
        {description && <span className='description' style={styles?.description}>{description}</span>}
      </div>
    }
  </>
}