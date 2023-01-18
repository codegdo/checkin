import React, { FC } from 'react';
import { LabelProps } from './input.type';

export const Label: FC<LabelProps> = ({ className, label, description, styles }): JSX.Element => {
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