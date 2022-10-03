import { DropTargetMonitor } from 'react-dnd';

interface BoundingClientRect {
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
  constructor() {}

  parentNodeDisplay(target: HTMLElement): string {
    const parentNode = target.parentNode as HTMLElement;
    let direction = 'column';

    if (target.hasAttribute('style')) {
      target.removeAttribute('style');
    }

    if (parentNode) {
      const display = parentNode.style.display;

      if (display == 'flex') {
        const flexDirection = parentNode.style.flexDirection;

        if (!flexDirection.includes('column') || flexDirection == '') {
          direction = 'row';
        }
      }
    }

    return direction;
  }

  totalCount({ id, data }): [number, string[]] {
    if (id == null || undefined) {
      id = '' + id;
    }

    const ids = this.count(data, [id.toString()]);

    return [ids.length, ids];
  }

  findDragDropIndex(item) {
    let { id: dragId, role: dragType, position: dragIndex, parentId: dragParentId, current } = item;

    let {
      id: dropId,
      role: dropType,
      position: dropIndex,
      parentId: dropParentId,
      offset,
    } = current.drop;

    // get dragItems count
    const [dragCounts, dragIds] = this.totalCount(item);

    // get dropItems count
    const [dropCounts, dropIds] = this.totalCount(current.drop);

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
    const type = `${dragType}_${dropType}`;
    const text = `${
      fromTopOverTop ||
      fromTopOverBottom ||
      fromBottomOverBottom ||
      fromBottomOverTop ||
      fromBottomOverMiddle ||
      'fromDrag'
    }`;

    if (type == 'field_field' || type == 'field_block' || type == 'block_block') {
      if (fromTopOverTop) {
        dropIndex = dropIndex - 1;
      } else if (fromBottomOverBottom) {
        dropIndex = dropIndex + 1;
      } else if (dragIndex == null) {
        if (overBottom) {
          dropIndex = dropIndex + 1;
        }
      }
    } else {
      if (fromTopOverTop) {
        dropIndex = dropIndex - dragCounts;
      } else if (fromTopOverBottom) {
        dropIndex = dropIndex + dropCounts - dragCounts;
      } else if (fromBottomOverBottom) {
        // nested
        if (dropIds.includes(dragId)) {
          dropIndex = dropIndex + dropCounts - dragCounts;
        } else {
          dropIndex = dropIndex + dropCounts;
        }
      } else if (fromBottomOverMiddle) {
        dropIndex = dropIndex + 1;
      } else if (dragIndex == null) {
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
      parentId: overMiddle ? dropId : dropParentId,
    };
  }

  onHover(
    monitor: DropTargetMonitor<any, void>,
    ref: React.RefObject<HTMLDivElement>,
    current: any
  ) {
    if (!ref.current) return;

    // get item
    const dragItem = monitor.getItem();
    const dropItem = current.drop;
    const target = ref.current;

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

    const display = this.parentNodeDisplay(target);

    let middle = 0;

    if (dropItem.role === 'parent' && !dropItem.data.length) {
      middle = 25;
    }

    if (display == 'row') {
      if (dropItem.x == clientOffset.x) return;

      dropItem.x = clientOffset.x;

      if (hoverClientX < hoverMiddleX) {
        target.classList.add('on-left');
        target.classList.remove('on-right');
        dropItem.offset = 'left';
      } else if (hoverClientX > hoverMiddleX) {
        target.classList.add('on-right');
        target.classList.remove('on-left');
        dropItem.offset = 'right';
      }
    } else {
      if (dropItem.y == clientOffset.y) return;

      dropItem.y = clientOffset.y;

      if (hoverClientY <= hoverMiddleY - middle) {
        target.classList.add('on-top');
        target.classList.remove('on-bottom', 'on-middle');
        dropItem.offset = 'top';
      } else if (hoverClientY >= hoverMiddleY + middle) {
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

  private count(data, ids = []) {
    if (data instanceof Array) {
      data.reduce((a, v) => {
        ids.push(v.id.toString());
        return a + (v.role == 'parent' ? this.count(v.data, ids) : 0);
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
