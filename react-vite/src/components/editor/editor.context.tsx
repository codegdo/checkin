import React, { PropsWithChildren, useEffect } from 'react';
import { EditorProps } from './editor.component';

export const EditorContext = React.createContext({});

function EditorProvider({ children, ...props }: PropsWithChildren<EditorProps>) {

  useEffect(() => {
    console.log('EDITOR', props);
  }, [props]);

  return <EditorContext.Provider value={{ ...props }}>
    {children}
  </EditorContext.Provider>
}

export default EditorProvider;