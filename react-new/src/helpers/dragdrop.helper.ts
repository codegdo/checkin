import { any } from 'joi';
import { DropTargetMonitor } from 'react-dnd';
import { randomString } from '../utils';

export interface BoundingClientRect {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

interface ClientOffset {
  x: number;
  y: number;
}

class DragDropHelper {
  constructor() { }

  display(target: HTMLElement): any {

    const parentNode = target.parentNode as HTMLElement;

    let display = 'column';

    if (parentNode) {
      const styleDisplay = parentNode.style.display || window.getComputedStyle(parentNode).display;
      const flexDirection = parentNode.style.flexDirection || window.getComputedStyle(parentNode).flexDirection;

      if (styleDisplay == 'flex') {
        if (!flexDirection.includes('column') || flexDirection == '') {
          display = 'row';
        }
      }

    }

    return display;
  }

  count({ id, data }): [number, string[]] {
    if (id == null) {
      id = id + '';
    }

    const ids = this.getCount(data, [id.toString()]);

    return [ids.length, ids];
  }

  find({ context, ...item }) {
    const { current } = context;

    if (!current.drop) {
      return null;
    }

    if (!current.drop.offset) {
      return null;
    }

    let {
      id: dragId,
      role: dragType,
      position: dragIndex
    } = item;

    let {
      id: dropId,
      role: dropType,
      position: dropIndex,
      parentId,
      placeholderId,
      offset,
    } = current.drop;

    // get dragItems count
    const [dragCounts, dragIds] = this.count(item);

    // get dropItems count
    const [dropCounts, dropIds] = this.count(current.drop);

    if (dropType == 'placeholder') {
      dropId = dropId.split('_')[0];
    }

    // reset parentId to null if drop is dropzone
    if (offset == 'middle') {
      parentId = (dropType == 'dropzone' ? null : dropId);
    }

    // prevent drag block drop over nest children
    if (dragIds.includes(dropId.toString())) {
      return null;
    }

    const fromTop = dragIndex < dropIndex && dragIndex !== null;
    const fromBottom = dragIndex > dropIndex && dragIndex !== null;
    const overTop = offset == 'top' || offset == 'left';
    const overBottom = offset == 'bottom' || offset == 'right';
    const overMiddle = offset == 'middle';

    const fromTopOverTop = fromTop && overTop && 'fromTop_overTop';
    const fromTopOverBottom = fromTop && overBottom && 'fromTop_overBottom';
    const fromBottomOverBottom = fromBottom && overBottom && 'fromBottom_overBottom';
    const fromBottomOverTop = fromBottom && overTop && 'fromBottom_overTop';
    const fromBottomOverMiddle = fromBottom && overMiddle && 'fromBottom_overMiddle';
    const fromDrag = 'fromDrag';

    const type = `${dragType}_${dropType}`;
    const text = `${fromTopOverTop ||
      fromTopOverBottom ||
      fromBottomOverBottom ||
      fromBottomOverTop ||
      fromBottomOverMiddle ||
      fromDrag
      }`;

    // dropIndex
    if (type == 'field_field' || type == 'field_element' || type == 'element_element') {
      if (fromTopOverTop) {
        dropIndex = dropIndex - 1;
      } else if (fromBottomOverBottom) {
        dropIndex = dropIndex + 1;
      } else if (dragIndex == null) {
        if (overBottom) {
          dropIndex = dropIndex + 1;
        }
      }
    } else if (type == 'field_placeholder' || type == 'element_placeholder' || type == 'block_placeholder') {
      dropIndex = dropIndex + dropCounts;
    } else {
      if (fromTopOverTop) {
        dropIndex = dropIndex - dragCounts;
      } else if (fromTopOverBottom) {
        dropIndex = dropIndex + dropCounts - dragCounts;
      } else if (fromBottomOverBottom) {
        // nested
        if (dropIds.includes(dragId.toString())) {
          dropIndex = dropIndex + dropCounts - dragCounts;
        } else {
          dropIndex = dropIndex + dropCounts;
        }
      } else if (fromBottomOverMiddle) {
        dropIndex = dropIndex + 1;
      } else if (dragIndex == null) {
        // fromDrag
        if (overMiddle) {
          dropIndex = dropIndex + 1;
        } else if (overBottom) {
          dropIndex = dropIndex + dropCounts;
        }
      }
    }

    console.log(`${type} ${text}`);

    return {
      dragIndex,
      dropIndex,
      dragCounts,
      dropCounts,
      dragIds,
      dropIds,
      dragType,
      dropType,
      parentId,
      placeholderId
    };
  }

  hover(
    {
      dragItem,
      dropItem,
      monitor,
      ref,
    }: {
      dragItem: any;
      dropItem: any;
      monitor: DropTargetMonitor<any, void>;
      ref: React.RefObject<HTMLDivElement>
    }
  ) {

    if (!ref.current) return;

    // target
    const target = ref.current;

    if (dragItem.id !== null && dropItem.id !== null && dragItem.id == dropItem.parentId) {
      return;
    }

    // determine rectangle on screen
    const hoverBoundingRect = ref.current.getBoundingClientRect() as BoundingClientRect;
    // determine mouse position
    const clientOffset = monitor.getClientOffset() as ClientOffset;
    // get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    // get pixels to the left
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;
    //
    const childNode = target.childNodes[0] as HTMLElement;

    if (dropItem.role === 'dropzone' || dropItem.role == 'placeholder') {
      target.classList.add('on-middle');
      dropItem.offset = 'middle';
    } else {
      const display = this.display(target);

      if (display == 'row') {
        if (dropItem.clientOffsetX == clientOffset.x) return;

        dropItem.clientOffsetX = clientOffset.x;

        let width = 0;

        if (target.classList.contains('-empty')) {
          width = (parseInt(window.getComputedStyle(target, ':after').width) || 0) / 2;
        }

        if (target.hasAttribute('style')) {
          target.removeAttribute('style');
        }

        if (hoverClientX <= hoverMiddleX - width) {
          target.classList.add('on-left');
          target.classList.remove('on-right', 'on-middle');
          dropItem.offset = 'left';
        } else if (hoverClientX >= hoverMiddleX + width) {
          target.classList.add('on-right');
          target.classList.remove('on-left', 'on-middle');
          dropItem.offset = 'right';
        } else {
          target.classList.add('on-middle');
          target.classList.remove('on-left', 'on-right');
          dropItem.offset = 'middle';
        }
      } else {
        if (dropItem.clientOffsetY == clientOffset.y) return;

        dropItem.clientOffsetY = clientOffset.y;

        let height = 0;

        if (target.classList.contains('-empty')) {
          height = (parseInt(window.getComputedStyle(target, ':after').height) || 0) / 2;
        }

        if (target.hasAttribute('style')) {
          target.removeAttribute('style');
        }

        if (hoverClientY <= hoverMiddleY - height) {
          target.classList.add('on-top');
          target.classList.remove('on-bottom', 'on-middle');
          dropItem.offset = 'top';
        } else if (hoverClientY >= hoverMiddleY + height) {
          target.classList.add('on-bottom');
          target.classList.remove('on-top', 'on-middle');
          dropItem.offset = 'bottom';
        } else {
          target.classList.add('on-middle');
          target.classList.remove('on-top', 'on-bottom');
          dropItem.offset = 'middle';
        }
      }
    }
  }

  private getCount(data, ids = []) {
    if (data instanceof Array) {
      data.reduce((a, v) => {
        ids.push(v.id.toString());
        return a + ((v.role == 'block') ? this.getCount(v.data, ids) : 0);
      }, data.length);
    }

    return ids;
  }
}

export const dragdropHelper = new DragDropHelper();






/*
if (
  dragPosition < dropPosition &&
  dropPosition - dragCounts == 0 &&
  (offset == 'top' || offset == 'left')
) {
  dropIndex = dragIndex;
  console.log('TOP', dropIndex);
} else if (
  dragPosition > dropPosition &&
  dragPosition - dropCounts == 0 &&
  (offset == 'bottom' || offset == 'right')
) {
  dropIndex = dropIndex + dropCounts;
  console.log('BOTTOM', dropIndex);
} else if (
  dragPosition < dropPosition &&
  (offset == 'top' || offset == 'left')
) {

} else if (offset == 'middle') {
  dragItem.parentId = dropId;
  dropIndex = dropIndex + 1;
}
*/
