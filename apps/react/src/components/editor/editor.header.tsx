import { forwardRef } from "react"

interface IProps {
  title: string;
}

const EditorHeader = forwardRef<HTMLDivElement, IProps>(({title}, ref) => {

  return <div ref={ref} className="editor-header">
    <div>{title}</div>
  </div>
});

export default EditorHeader;