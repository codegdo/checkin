import React, { FC, useEffect, useState } from 'react';
import { ControlRange } from '../control/control.range';

export const EditorContent: FC<any> = (): JSX.Element => {
  return <>
    Content
    <ControlRange />
  </>
}

/*
const { values: initialValues, keys } = data;
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues({ ...data.values })
  }, [data]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setValues({ ...values, [name]: value });
    onChange({ key: 'content', name, value });
  }


{Object.keys(values).map((key, i) => {
      switch (keys[key].type) {
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
*/