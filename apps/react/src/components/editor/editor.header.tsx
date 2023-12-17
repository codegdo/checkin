import { forwardRef } from "react"

interface IProps {
  
}

const EditorHeader = forwardRef<HTMLDivElement, IProps>((props, ref) => {

  return <div ref={ref} className="editor-header">
    <div>Header</div>
  </div>
});

export default EditorHeader;