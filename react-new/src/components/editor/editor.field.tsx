import React, { FC, useEffect, useState } from 'react';

export const EditorField: FC<any> = ({ values: initialValues, fields, onChange }): JSX.Element => {
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues({ ...initialValues })
  }, [initialValues]);

  useEffect(() => {
    onChange(values);
  }, [values]);

  const handleChange = (event: any) => {
    const key = event.target.name;
    const value = event.target.value;

    setValues({ ...values, [key]: value })
  }

  return <div>

    {Object.keys(values).map((key, i) => {
      switch (fields[key].type) {
        case 'text':
          return <div key={i}>
            <label>{key}</label>
            <input name={key} value={values[key]} onChange={handleChange} />
          </div>;
        case 'textarea':
          return <div key={i}>
            <label>{key}</label>
            <textarea name={key} onChange={handleChange}>{values[key]}</textarea>
          </div>
        default:
          return <></>
      }
    })}
  </div>
}