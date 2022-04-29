import React, { Children, isValidElement, ReactNode } from 'react';

type ObjectKeyValues = {
  key: string;
  values: any[];
};

type ObjectKeyChildren = {
  key: string;
  children: ReactNode;
};

type FieldProps = {
  props: Record<string, any>
};

export const childrenToObjectValue = ({ key, children }: ObjectKeyChildren): { [x: string]: string } => {
  let value = {};

  Children.forEach(children, (child) => {
    if (isValidElement(child) && typeof child.type !== 'string') {
      const { props }: FieldProps = child;
      value = { ...value, [props[key]]: '' };
    }
  });

  return value;
};

export const arrayToObjectValue = ({ key, values, }: ObjectKeyValues): { [x: string]: string } => {
  return values.reduce((value, i) => {
    return { ...value, [i[key]]: '' };
  }, {});
};

/*
input: [
  {
    key: a
  },
  {
    key: b
  }
]

output: {
  a: '',
  b: ''
}
*/
