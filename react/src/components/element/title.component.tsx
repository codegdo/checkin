import React from 'react';

type TitleProps = {
  name?: string;
  description?: string;
}

export const Title: React.FC<TitleProps> = ({ name, description }): JSX.Element | null => {

  if (!name && !description) {
    return null;
  }

  return (
    <div>
      {name && <strong>{name}</strong>}
      {description && <span>{description}</span>}
    </div>
  )
}