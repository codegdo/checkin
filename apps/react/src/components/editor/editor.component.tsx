
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

import { IEditorProps } from "./hooks";


import { EditorWrapper } from "./editor.wrapper";

interface IProps extends IEditorProps { }

export const Editor = (props: IProps) => {
  const backend = ('ontouchstart' in window) ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
      <EditorWrapper {...props} />
    </DndProvider>
  )
}

// npx madge src/components/editor/editor.component.tsx --image src/components/editor/editor.graph.png --warning