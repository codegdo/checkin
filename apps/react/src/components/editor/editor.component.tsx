import { forwardRef } from "react";

import { Field, KeyValue } from "./types";
import { useEditorState } from "./hooks";
import { EditorProvider } from "./editor.provider";
import EditorHeader from "./editor.header";
import EditorTab from "./editor.tab";
import EditorContent from "./editor.content";

interface IProps {
  title?: string;
  data?: Field;
  onChange?: (keyvalue: KeyValue) => void;
}

export const Editor = forwardRef<HTMLDivElement, IProps>(({ title = 'Editor', data, onChange }, ref) => {

  const { current, state, dispatch } = useEditorState({ data, onChange });

  return <div className="editor">
    <EditorProvider value={{ current, state, dispatch }}>
      <EditorHeader ref={ref} title={title} />
      <EditorTab />
      <EditorContent />
    </EditorProvider>
  </div>
});

// npx madge src/components/editor/editor.component.tsx --image src/components/editor/editor.graph.png --warning