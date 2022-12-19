import React, { FC, useContext } from 'react';
import { getSetStringKeyObject } from '../../utils';
import { Control } from '../control';
import { EditorContext } from './editor.context';
import { EditorContextProps } from './editor.type';

export const EditorDesign: FC<any> = (): JSX.Element => {

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

  return <Control data={editor?.design} values={values} onChange={handleChange} onClick={handleClick} />
}