import { forwardRef } from "react";
import { EditorProvider } from "./editor.provider";
import EditorHeader from "./editor.header";
import EditorTab from "./editor.tab";
import EditorContent from "./editor.content";

interface IProps {}

export const Editor = forwardRef<HTMLDivElement, IProps>((props, ref) => {

  return <div className="editor">
    <EditorProvider value={{}}>
      <EditorHeader ref={ref} />
      <EditorTab />
      <EditorContent />
    </EditorProvider>
  </div>
})