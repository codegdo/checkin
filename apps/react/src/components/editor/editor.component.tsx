import { forwardRef, useReducer, useRef } from "react";

import { Field, KeyValue } from "./types";

import { EditorProvider } from "./editor.provider";
import EditorHeader from "./editor.header";
import EditorTab from "./editor.tab";
import EditorContent from "./editor.content";
import { currentRef, defaultState } from "./default.value";
import { editorReducer } from "./editor.reducer";


interface IProps {
  title?: string;
  data?: Field;
  onChange?: (keyvalue: KeyValue) => void;
}

export const Editor = forwardRef<HTMLDivElement, IProps>(({ title = 'Editor', data, onChange }, ref) => {
  const { current } = useRef({ ...currentRef, onChange });
  const [state, dispatch] = useReducer(editorReducer, { ...defaultState, dataValue: data, dataSource: structuredClone(data) });

  return <div className="editor">
    <EditorProvider value={{ current, state, dispatch }}>
      <EditorHeader ref={ref} title={title} />
      <EditorTab />
      <EditorContent />
    </EditorProvider>
  </div>
});

// npx madge src/components/editor/editor.component.tsx --image src/components/editor/editor.graph.png --warning