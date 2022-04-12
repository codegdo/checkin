import React, { Children, isValidElement, ReactNode } from 'react';

type ObjectKeyParam = {
  key: string;
  values: any[];
};

type FieldProps = {
  props: {
    name: string;
  };
};

export const childrenToObjectValue = (children: ReactNode): { [x: string]: string } => {
  let value = {};

  Children.forEach(children, (child) => {
    if (isValidElement(child) && typeof child.type !== 'string') {
      const { props }: FieldProps = child;
      value = { ...value, [props.name]: '' };
    }
  });

  return value;
};

export const arrayToObjectValue = ({ key, values }: ObjectKeyParam): { [x: string]: string } => {
  return values.reduce((value, i) => {
    return { ...value, [i[key]]: '' };
  }, {});
};
