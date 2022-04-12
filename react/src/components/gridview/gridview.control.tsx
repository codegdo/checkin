import React, { useContext, useEffect, useState } from 'react';
import { arrayToObjectValue, childrenToObjectValue } from '../../utils';

import { DynamicControl } from './dynamic.control';
import { GridViewContext } from './gridview.component';
import { StaticControl } from './static.control';

export const ControlContext = React.createContext<any>(undefined);

export const Control: React.FC = ({ children }): JSX.Element => {

  const context = useContext(GridViewContext);

  if (!context) {
    throw new Error('Required CONTEXT');
  }

  const { fields } = context;

  const initialValues = childrenToObjectValue(children);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {

    if (!children && fields) {
      const data = arrayToObjectValue({ key: 'name', values: fields });
      setValues({ ...data });
    }

  }, [fields]);

  useEffect(() => {
    console.log('CHANGE EFFECT:', values);
  }, [values]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setValues({ ...values, [name]: value });
  }

  const handleClick = () => {
    //
  }

  return <div className="control">
    <ControlContext.Provider value={{ values, handleChange, handleClick }}>
      {
        children ? <StaticControl>{children}</StaticControl> : <DynamicControl data={fields} />
      }
    </ControlContext.Provider>
  </div>
}