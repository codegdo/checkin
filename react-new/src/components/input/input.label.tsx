import React, { FC } from 'react';
import { LabelProps } from './input.type';

export const Label: FC<LabelProps> = ({ className, label, description, style }): JSX.Element => {
  return <>
    {
      (label || description) &&
      <div>
        {label && <label className='label' style={style}>{label}</label>}
        {description && <span className='description'>{description}</span>}
      </div>
    }
  </>
}