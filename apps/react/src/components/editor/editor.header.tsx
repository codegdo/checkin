import { forwardRef } from "react"
import { useEditorContext } from "./editor.provider";

const EditorHeader = forwardRef<HTMLDivElement>((_, ref) => {
  const { props } = useEditorContext();

  return <div ref={ref} className="editor-header">
    <div>{props?.data?.dataType || 'Editor'}</div>
  </div>
});

export default EditorHeader;