import React, { Children, isValidElement, ReactNode } from 'react';

type FieldProps = {
  props: {
    name: string;
  };
};

export const childrenToObjectKey = <T>(children: ReactNode): T => {
  let value = {};

  Children.forEach(children, (child) => {
    if (isValidElement(child) && typeof child.type !== 'string') {
      const { props }: FieldProps = child;
      value = { ...value, [props.name]: '' };
    }
  });

  return value as T;
};
