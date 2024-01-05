import { forwardRef } from "react";
import { EditorProvider } from "./editor.provider";
import { EditorSlider } from "./editor.slider";
import { IEditorProps, useEditorState } from "./hooks";
interface IProps extends IEditorProps { }

export const EditorContainer = forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const editorState = useEditorState(props);

  return (
    <EditorProvider value={{ ...editorState }}>
      <EditorSlider ref={ref} />
    </EditorProvider>
  )
});