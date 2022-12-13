import React, { FC, useContext, useEffect } from 'react';
import { getSetStringKeyObject } from '../../utils';
import { Control } from '../control';
import { EditorContext } from './editor.context';
import { EditorContextProps } from './editor.type';

export const EditorContent: FC<any> = (): JSX.Element => {

  const ctx = useContext((EditorContext) as React.Context<EditorContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { editor, values, onChange, onClick } = ctx;

  const handleChange = ({ key, value }: any) => {

    console.log('EDITOR CHANGE', values, key, value);

    const { obj } = getSetStringKeyObject(values, key, value);

    onChange && onChange(obj);
  }

  const handleClick = () => {
    console.log('EDITOR CLICK');
  }

  return <Control data={editor?.content} values={values} onChange={handleChange} onClick={handleClick} />
}

/*
<Control type='padding' />
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