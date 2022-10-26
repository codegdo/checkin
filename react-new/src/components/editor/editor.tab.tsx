import React, { FC, useContext } from 'react';
import { EditorContext } from './editor.context';
import { EditorContextProps } from './editor.type';

export const EditorTab: FC = (): JSX.Element => {
  const ctx = useContext((EditorContext as Object) as React.Context<EditorContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { tab, setTab, data } = ctx;

  const handleTabClick = (event: any) => {
    setTab(event.target.name);
  }

  return <>
    {Object.keys(data).map((key) => {
      return <span key={key}>
        <button className={(tab == key) ? 'active' : ''} name={key} type='button' onClick={handleTabClick}>{key}</button>
      </span>
    })}
  </>
}