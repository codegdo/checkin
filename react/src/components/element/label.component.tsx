import React from 'react';

type LabelProps = {
  label?: string;
  description?: string;
}

export const Label: React.FC<LabelProps> = ({ label, description }): JSX.Element | null => {

  if (!label && !description) {
    return null;
  }

  return (
    <span>
      {label && <label>{label}</label>}
      {description && <small>{description}</small>}
    </span>
  )
}