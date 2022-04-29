import React, { Children, isValidElement, ReactNode, useContext, useEffect, useState } from 'react';
import { GridViewContext } from './gridview.component';
import { DataColumnProps } from './gridview.type';

export const THead: React.FC<{ children: ReactNode | undefined }> = ({ children }): JSX.Element | null => {
  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { columns, config = {}, currentQuery: { sort }, status, onSearch } = context;
  const { columns: configColumns } = config;

  const [value, setValue] = useState('');
  const [direction, setDirection] = useState('');

  console.log('STATUS', status);

  const handleClick = (event: React.MouseEvent<HTMLHeadElement>) => {
    const abbr = event.currentTarget.getAttribute('abbr') || '';

    if (abbr == value) {

      switch (direction) {
        case 'asc':
          setDirection('desc');
          sort.direction = 'desc';
          break;
        case 'desc':
          setValue('');
          setDirection('');
          sort.column = null;
          sort.direction = null;
          break;
        default:
          setValue('');
          setDirection('');
          sort.column = null;
          sort.direction = null;
      }

    } else {
      setValue(abbr);
      setDirection('asc');
      sort.column = abbr;
      sort.direction = 'asc';
    }

    onSearch && onSearch('search');

  }

  return <thead>
    <tr>
      {
        children ? Children.map(children, (child): JSX.Element | null => {
          if (isValidElement(child) && typeof child.type !== 'string') {
            const { name, label } = child.props as DataColumnProps;
            const typeName = child.type.name;

            if (typeName == 'DataColumn') {
              return <th abbr={name} className={value == name ? direction : ''} onClick={(e) => status !== 'pending' && handleClick(e)}>{label || name}</th>;
            } else {
              return null;
            }
          }
          return null;
        }) : columns && <>
          {
            columns.map((column: any, i: any) => {
              const { name, label } = column;
              return <th abbr={name} key={i} className={value == name ? direction : ''} onClick={(e) => status !== 'pending' && handleClick(e)}>{label || name}</th>;
            })
          }
          {
            configColumns && configColumns.map((column: any, i: any) => {
              const { name, label } = column;
              return <th abbr={name} key={i} className={value == name ? direction : ''} onClick={(e) => status !== 'pending' && handleClick(e)}>{label || name}</th>;
            })
          }
        </>
      }
    </tr>
  </thead>

}