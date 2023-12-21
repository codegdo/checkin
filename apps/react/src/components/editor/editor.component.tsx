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

  const editorState = useEditorState({ data, onChange });

  return <div className="editor">
    <EditorProvider value={{ ...editorState }}>
      <EditorHeader ref={ref} title={title} />
      <EditorTab />
      <EditorContent />
    </EditorProvider>
  </div>
});

// npx madge src/components/editor/editor.component.tsx --image src/components/editor/editor.graph.png --warning