import React from 'react';

type LabelProps = {
  title?: string;
  description?: string;
}

export const Label: React.FC<LabelProps> = ({ title, description }): JSX.Element | null => {

  if (!title && !description) {
    return null;
  }

  return (
    <span>
      {title && <label>{title}</label>}
      {description && <small>{description}</small>}
    </span>
  )
}