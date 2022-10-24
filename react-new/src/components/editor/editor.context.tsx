import React, { FC, PropsWithChildren, createContext, useCallback, useEffect, useReducer, useState } from 'react';

//import { initialState, reducer } from './editor.reducer';
import { EditorContextProps, EditorProps } from './editor.type';

export const EditorContext = createContext<EditorContextProps | null>(null);

export const EditorProvider: FC<PropsWithChildren<EditorProps>> = ({ children, ...props }) => {
  //const [state, dispatch] = useReducer(reducer, initialState);
  //const [data, setData] = useState(null);

  return <EditorContext.Provider value={{ ...props }}>
    {children}
  </EditorContext.Provider>
}