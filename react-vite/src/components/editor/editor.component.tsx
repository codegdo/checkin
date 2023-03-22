import React, { PropsWithChildren } from 'react';
import EditorProvider from './editor.context';

interface EditorData {
  content?: any[],
  design?: any[],
  setting?: any[]
}

export interface EditorProps {
  data?: EditorData
}

function Editor({ children, ...props }: PropsWithChildren<EditorProps>): JSX.Element {
  return <EditorProvider {...props}>
    {children}
  </EditorProvider>
}

export default Editor;