import React, { FC } from 'react';
import { LabelProps } from './input.type';


export const Label: FC<LabelProps> = ({ label, description }): JSX.Element => {
  return <>
    {
      (label || description) && <span>
        {label && <label>{label}</label>}
        {description && <small>{description}</small>}
      </span>
    }
  </>
}