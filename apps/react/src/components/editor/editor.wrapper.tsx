import { EditorContainer } from "./editor.container";

import { IEditorProps, useDraggable } from "./hooks";
interface IProps extends IEditorProps { }

export const EditorWrapper = (props: IProps) => {

  const { rElement, rPreview } = useDraggable({
    type: 'drag',
    init: true,
    offset: props?.options?.offset || { x: 0, y: 0 }
  });

  return (
    <div className="draggable" ref={rPreview}>
      <EditorContainer {...props} ref={rElement} />
    </div>
  )
};