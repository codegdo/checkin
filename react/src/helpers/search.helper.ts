import React, { Children, isValidElement, ReactNode } from 'react';
import { CurrentQuery } from '../components/gridview/gridview.type';

type ObjectKeyColumns = {
  key: string;
  columns: any[] | undefined;
};

type ObjectKeyChildren = {
  key: string;
  children: ReactNode;
};

type FieldProps = {
  props: Record<string, any>;
};

export const filterSearchKeyChildren = ({ key, children }: ObjectKeyChildren): string[] => {
  let keys: string[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && typeof child.type !== 'string') {
      const { props }: FieldProps = child;

      if (props.isDefault && props.isSearch) {
        keys = [...keys, props[key]];
      }
    }
  });

  return keys;
};

export const filterSearchKeyColumns = ({ key, columns = [] }: ObjectKeyColumns): string[] => {
  return columns.reduce((column, i) => {
    if (i.isDefault && i.isSearch) {
      return [...column, i[key]];
    }
    return [...column]
  }, []);
};

export const stringifySearchQuery = ({ search, sort }: CurrentQuery): string => {
  const { keys, value } = search;
  const { column, direction } = sort;
  const strSearch = keys.map(key => value ? key + `=${value}` : '').filter(Boolean).join('&');
  const strSort = column ? `sortColumn=${column}&sortDirection=${direction}` : '';
  const query = [strSearch, strSort].filter(Boolean).join('&');

  return query ? `?${query}` : query;
}

/*

filterSearchKeyColumns
---
input: [
  {
    key: a
  },
  {
    key: b
  }
]

output: [a,b]
*/