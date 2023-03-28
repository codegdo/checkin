import React, { FC, PropsWithChildren } from 'react';
import { EditorProvider} from './editor.context';

export interface EditorData {
  content?: any[],
  design?: any[],
  setting?: any[]
}

export type EditorProps<T> = PropsWithChildren<{
  data?: EditorData,
  value?: T, 
  onChange?: () => void,
  onClick?: () => void
}> 

export const Editor: FC<EditorProps<any>> = ({ children, ...props }): JSX.Element => {
  return <EditorProvider {...props}>
    {children}
  </EditorProvider>
}