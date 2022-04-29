import React, { Children, isValidElement, ReactNode, useContext, useEffect, useState } from 'react';

import { filterSearchKeyChildren, filterSearchKeyColumns } from '../../helpers';
import { GridViewContext } from './gridview.component';
import { DataColumnProps } from './gridview.type';

export const ControlContext = React.createContext<any>(undefined);

export const Control: React.FC<{ children: ReactNode | undefined }> = ({ children }): JSX.Element => {

  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { columns, currentQuery: { search }, status, onSearch } = context;
  const initialValues = children ? filterSearchKeyChildren({ key: 'name', children }) : filterSearchKeyColumns({ key: 'name', columns });
  const [keys, setKeys] = useState<string[]>(initialValues);
  const [value, setValue] = useState('');

  useEffect(() => {
    search.keys = [...initialValues];
  }, []);

  useEffect(() => {
    console.log(value);
    console.log(keys);
    console.log(search);
  }, [value, keys]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const v = event.target.value;
    setValue(v);
    search.value = v
  }

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;

    if (event.target.checked) {
      const _keys = [...keys, name];
      setKeys(_keys);
      search.keys = _keys;
    } else {
      const _keys = keys.filter(v => v !== event.target.name);
      setKeys(_keys);
      search.keys = _keys;
    }

  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) => {
    //
    if (status == 'pending') {
      return;
    }

    if (event.currentTarget.name == 'clear') {
      setValue('');
      search.value = null;
    }

    onSearch && onSearch(event.currentTarget.name);
  }

  return <div className="control">
    <div className="search">
      <input type="input" onChange={handleChange} value={value} />
      <button type="button" name="search" disabled={(status == 'pending')} onClick={handleClick}>Search</button>
      <button type="button" name="clear" disabled={(status == 'pending')} onClick={handleClick}>Clear</button>
    </div>
    <div className="filter">
      {
        children ? Children.map(children, (child): JSX.Element | null => {
          if (isValidElement(child) && typeof child.type !== 'string') {
            const typeName = child.type.name;
            const { name, label, isSearch } = child.props as DataColumnProps;

            if (typeName == 'DataColumn') {
              return isSearch ? <label>
                <input type="checkbox" name={name} checked={keys.includes(name || '')} onChange={handleCheck} />
                <span>{label || name}</span>
              </label> : null;
            } else {
              return null;
            }
          }
          return null;
        }) : columns && <>
          {
            columns.map((column, i) => {
              const { name, label, isSearch } = column;

              return isSearch ? <label key={i}>
                <input type="checkbox" name={name} checked={keys.includes(name || '')} onChange={handleCheck} />
                <span>{label || name}</span>
              </label> : null;
            })
          }
        </>
      }
    </div>
  </div>
}