import { DropTargetMonitor } from 'react-dnd';

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

  display(target: HTMLElement): string {

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

  find({ context, ...dragItem }) {
    const { current } = context;
    const dropItem = current.drop;

    if (!dropItem || !dropItem?.offset) {
      return null;
    }

    const {
      id: dragId,
      dataType: dragType,
      position: dragIndex
    } = dragItem;

    let dropId = dropItem.id;
    let dropIndex = dropItem.position;
    let parentId = dropItem.parentId;

    const {
      dataType: dropType,
      placeholderId,
      offset,
    } = dropItem;

    // get dragItems count
    const [dragCounts, dragIds] = this.count(dragItem);

    // get dropItems count
    const [dropCounts, dropIds] = this.count(dropItem);

    if (dropType == 'placeholder') {
      dropId = dropId.split('_')[0];
    }

    // reset parentId to null if dropzone
    if (offset == 'middle') {
      parentId = (dropType == 'dropzone' ? null : dropId);
    }

    // prevent drag block drop over nest children
    if (dragIds.includes(`${dropId}`)) {
      return null;
    }

    const fromTop = dragIndex < dropIndex && dragIndex !== null;
    const fromBottom = dragIndex > dropIndex && dragIndex !== null;
    const overTop = offset == 'top' || offset == 'left';
    const overBottom = offset == 'bottom' || offset == 'right';
    const overMiddle = offset == 'middle';

    const fromTopOverTop = fromTop && overTop && 'fromTop_overTop';
    const fromTopOverBottom = fromTop && overBottom && 'fromTop_overBottom';
    const fromTopOverMiddle = fromTop && overMiddle && 'fromTop_overMiddle';
    const fromBottomOverBottom = fromBottom && overBottom && 'fromBottom_overBottom';
    const fromBottomOverTop = fromBottom && overTop && 'fromBottom_overTop';
    const fromBottomOverMiddle = fromBottom && overMiddle && 'fromBottom_overMiddle';
    const fromDrag = 'fromDrag';

    const dragdropType = `${dragType}_${dropType}`;
    const isField = ['field_field', 'field_element', 'element_element'].includes(dragdropType);
    const isPlaceholder = ['field_placeholder', 'element_placeholder', 'block_placeholder'].includes(dragdropType);
    const isNested = dropIds.includes(`${dragId}`);

    const text = `${fromTopOverTop ||
      fromTopOverBottom ||
      fromTopOverMiddle ||
      fromBottomOverBottom ||
      fromBottomOverTop ||
      fromBottomOverMiddle ||
      fromDrag
      }`;

    const decrement = dropIndex - 1;
    const increment = dropIndex + 1;
    const decrementWithDrags = dropIndex - dragCounts;
    const decrementWithDrops = dropIndex + dropCounts - dragCounts;
    const incrementWithDrops = dropIndex + dropCounts;

    // dropIndex
    switch (true) {
      case isField:
        if (fromTopOverTop) {
          dropIndex = decrement;
        } else if (fromBottomOverBottom) {
          dropIndex = increment;
        } else if (overBottom && !dragIndex) {
          dropIndex = increment;
        }
        break;
      case isPlaceholder:
        if (fromTopOverMiddle) {
          dropIndex = decrementWithDrops;
        } else if (fromBottomOverMiddle) {
          dropIndex = incrementWithDrops;
        } else {
          dropIndex = increment;
        }
        break;
      default:
        if (fromTopOverTop) {
          dropIndex = decrementWithDrags;
        } else if (fromTopOverBottom) {
          dropIndex = decrementWithDrops;
        } else if (fromBottomOverBottom) {
          dropIndex = isNested ? decrementWithDrops : incrementWithDrops;
        } else if (fromBottomOverMiddle) {
          dropIndex = increment;
        } else if (overMiddle && !dragIndex) {
          dropIndex = increment;
        } else if (overBottom && !dragIndex) {
          dropIndex = incrementWithDrops;
        }
    }

    const output = {
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

    console.log(`${dragdropType} ${text}`);
    console.log(output);

    return output;
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

    // target
    const target = ref.current;

    if (!target) return;

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
    //const childNode = target.childNodes[0] as HTMLElement;

    if (dropItem.dataType === 'dropzone' || dropItem.dataType == 'placeholder') {
      target.classList.add('on-middle');
      dropItem.offset = 'middle';
      return;
    }

    if (dropItem.displayAs == 'row') {
      if (dropItem.clientOffsetX == clientOffset.x) return;

      const { width } = this.getComputedAfterStyle(target);

      dropItem.clientOffsetX = clientOffset.x;

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

      const { height } = this.getComputedAfterStyle(target);

      dropItem.clientOffsetY = clientOffset.y;

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

  private getCount(data, ids = []) {
    if (data instanceof Array) {
      data.reduce((a, v) => {
        ids.push(v.id.toString());
        return a + ((v.dataType == 'block') ? this.getCount(v.data, ids) : 0);
      }, data.length);
    }

    return ids;
  }

  private getComputedAfterStyle(target: HTMLElement): { width: number, height: number } {
    let width = 0;
    let height = 0;

    if (target.classList.contains('-empty')) {
      width = (parseInt(window.getComputedStyle(target, ':after').width) || 0) / 2;
      height = (parseInt(window.getComputedStyle(target, ':after').height) || 0) / 2;
    }

    return { width, height }
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
