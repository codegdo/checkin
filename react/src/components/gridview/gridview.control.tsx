import React, { Children, isValidElement, ReactNode, useContext, useEffect, useState } from 'react';


import { Filter } from './control.filter';
import { Search } from './control.search';
import { arrayToObjectValue, childrenToObjectValue } from '../../utils';
import { GridViewContext } from './gridview.component';
import { DataColumnProps } from './gridview.type';

export const ControlContext = React.createContext<any>(undefined);

export const Control: React.FC<{ children: ReactNode | undefined }> = ({ children }): JSX.Element => {

  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { columns } = context;

  const initialValues = childrenToObjectValue(children);
  const [values, setValues] = useState(initialValues);
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log(value);
  }, [value]);

  useEffect(() => {

    if (!children && columns) {
      const data = arrayToObjectValue({ key: 'name', values: columns });
      setValues({ ...data });
    }

  }, [columns]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //const name = event.target.name;
    //const value = event.target.value;

    //setValues({ ...values, [name]: value });
    setValue(event.target.value);
    console.log(event.type);
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) => {
    //
    if (event.currentTarget.name == 'search') {

    } else {
      setValue('');
    }

  }

  return <div className="control">
    <div className="search">
      <input type="input" onChange={handleChange} value={value} />
      <button type="button" name="search" onClick={handleClick}>Search</button>
      <button type="button" name="clear" onClick={handleClick}>Clear</button>
    </div>
    <div className="filter">
      {
        children ? Children.map(children, (child): JSX.Element | null => {
          if (isValidElement(child) && typeof child.type !== 'string') {
            const { name, label, isSearch } = child.props as DataColumnProps;
            const typeName = child.type.name;

            if (typeName == 'DataColumn') {
              return isSearch ? <label><input type="checkbox" name={name} /><span>{label || name}</span></label> : null;
            } else {
              return null;
            }
          }
          return null;
        }) : columns && <>
          {
            columns.map((column: any, i: any) => {
              const { name, label, isSearch } = column;
              return isSearch ? <label><input type="checkbox" name={name} /><span key={i}>{label || name}</span></label> : null;
            })
          }
        </>
      }
    </div>
  </div>
}