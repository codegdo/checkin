import { DragPreview } from "./drag.preview";
import { DragRender } from "./drag.render";
import { DropEditor } from "./drop.editor";
import { DropRender } from "./drop.render";

export function DragDropWrapper() {
  return (
    <>
      <DropRender />
      <DragRender />
      <DragPreview />
      <DropEditor />
    </>
  );
}