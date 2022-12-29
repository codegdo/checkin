import React from 'react';

export const Label: React.FC<any> = ({ className = 'label', label, description }): JSX.Element => {

  return <span className={className}>
    <label>{label}</label>
    <small>{description}</small>
  </span>
}