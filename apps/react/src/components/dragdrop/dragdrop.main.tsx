import DragRender from "./drag.render";
import DropRender from "./drop.render";

function DragDropMain() {
  return <main className="dragdrop-main">
    <DropRender />
    <DragRender />
  </main>
}

export default DragDropMain;