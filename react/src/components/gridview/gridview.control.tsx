import React, { useContext, useEffect, useState } from 'react';


import { Filter } from './control.filter';
import { Search } from './control.search';
import { arrayToObjectValue, childrenToObjectValue } from '../../utils';
import { GridViewContext } from './gridview.component';

export const ControlContext = React.createContext<any>(undefined);

export const Control: React.FC = ({ children }): JSX.Element => {

  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { columns } = context;

  const initialValues = childrenToObjectValue(children);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {

    if (!children && columns) {
      const data = arrayToObjectValue({ key: 'name', values: columns });
      setValues({ ...data });
    }

  }, [columns]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setValues({ ...values, [name]: value });
  }

  const handleClick = () => {
    //
  }

  return <div className="control">
    <ControlContext.Provider value={{ data: columns, values, handleChange, handleClick }}>
      <Search>{children}</Search>
      <Filter>{children}</Filter>
    </ControlContext.Provider>
  </div>
}