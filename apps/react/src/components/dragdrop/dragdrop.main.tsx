import DragRender from "./drag.render";
import DropRender from "./drop.render";

function DragDropMain() {
  return <div className="dragdrop-main">
    <DropRender />
    <DragRender dragData={[]} drags={[]} />
  </div>
}

export default DragDropMain;