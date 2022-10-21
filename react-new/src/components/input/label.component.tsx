import React, { FC } from 'react';
import { LabelProps } from './input.type';


export const Label: FC<LabelProps> = ({ className, label, description }): JSX.Element => {
  return <>
    {
      (label || description) &&
      <span>
        {label && <label className='label'>{label}</label>}
        {description && <small className='description'>{description}</small>}
      </span>
    }
  </>
}