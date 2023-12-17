import { forwardRef, useReducer, useState } from "react";
import { EditorProvider } from "./editor.provider";
import EditorHeader from "./editor.header";
import EditorTab from "./editor.tab";
import EditorContent from "./editor.content";
import { editorReducer } from "./editor.reducer";
import { defaultState } from "./default.value";

export interface KeyValue {
  key: string; 
  value: string;
} 
 
interface IProps {
  title?: string;
  data?: Record<string, any>;
  onChange?: (keyvalue: KeyValue) => void;
}

export const Editor = forwardRef<HTMLDivElement, IProps>(({title = 'Editor', data = {}, onChange}, ref) => {
  const [tab, setTab] = useState('');
  const [state, dispatch] = useReducer(editorReducer, {...defaultState, dataSource: data});

  return <div className="editor">
    <EditorProvider value={{state, dispatch}}>
      <EditorHeader ref={ref} title={title} />
      <EditorTab setTab={setTab} />
      <EditorContent tab={tab} />
    </EditorProvider>
  </div>
});

// npx madge src/components/editor/editor.component.tsx --image src/components/editor/editor.graph.png --warning