import React from 'react';

type TitleProps = {
  title?: string;
  description?: string;
}

export const Title: React.FC<TitleProps> = ({ title, description }): JSX.Element | null => {

  if (!title && !description) {
    return null;
  }

  return (
    <div>
      {title && <strong>{title}</strong>}
      {description && <span>{description}</span>}
    </div>
  )
}