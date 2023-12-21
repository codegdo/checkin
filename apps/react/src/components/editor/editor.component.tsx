import { forwardRef } from "react";

import { IEditorProps, useEditorState } from "./hooks";
import { EditorProvider } from "./editor.provider";
import EditorHeader from "./editor.header";
import EditorTab from "./editor.tab";
import EditorContent from "./editor.content";

interface IProps extends IEditorProps { }

export const Editor = forwardRef<HTMLDivElement, IProps>((props, ref) => {

  const editorState = useEditorState(props);

  return <div className="editor">
    <EditorProvider value={{ ...editorState }}>
      <EditorHeader ref={ref} />
      <EditorTab />
      <EditorContent />
    </EditorProvider>
  </div>
});

// npx madge src/components/editor/editor.component.tsx --image src/components/editor/editor.graph.png --warning