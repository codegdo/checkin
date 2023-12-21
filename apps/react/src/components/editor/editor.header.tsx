import { forwardRef } from "react"
import EditorContext from "./editor.provider";
import { useWrapperContext } from "@/hooks";


const EditorHeader = forwardRef<HTMLDivElement>((_, ref) => {
  const { props } = useWrapperContext(EditorContext);

  return <div ref={ref} className="editor-header">
    <div>{props?.data?.dataType || 'Editor'}</div>
  </div>
});

export default EditorHeader;