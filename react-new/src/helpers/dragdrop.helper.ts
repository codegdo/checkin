class DragDropHelper {
  constructor() { }

  parentNodeDisplay(parentNode: HTMLElement | null): string {
    let direction = 'column';

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

    return [ids.length, ids]
  }

  findDragDropIndex(item) {
    let {
      id: dragId,
      role: dragType,
      position: dragIndex,
      parentId: dragParentId,
      current,
    } = item;

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

    if (dragType === 'field' && dropType === 'field') {
      if (fromTop && overTop) {
        dropIndex = dropIndex - 1;
        console.log(`${dragType}to${dropType} (drag-from-top and drop-over-top)`);
      } else if (fromBottom && overBottom) {
        dropIndex = dropIndex + 1;
        console.log(`${dragType}to${dropType} (drag-from-bottom and drop-over-bottom)`);
      } else if (overTop) {
        //dropIndex = dropIndex - 1;
        console.log(`${dragType}to${dropType} (drag and drop-over-top)`);
      } else if (overBottom) {
        dropIndex = dropIndex + 1;
        console.log(`${dragType}to${dropType} (drag and drop-over-bottom)`);
      }
    } else {
      if (fromTop && overTop) {
        dropIndex = dropIndex - dragCounts;
        console.log(`${dragType}to${dropType} (drag-from-top and drop-over-top)`);
      } else if (fromTop && overBottom) {
        dropIndex = dropIndex + dropCounts - dragCounts;
        console.log(`${dragType}to${dropType} (drag-from-top and drop-over-bottom)`);
      } else if (fromBottom && overBottom) {
        // check drag is in drop parent
        if (dropIds.includes(dragId)) {
          dropIndex = dropIndex + dropCounts - dragCounts;
        } else {
          dropIndex = dropIndex + dropCounts;
        }
        console.log(`${dragType}to${dropType} (drag-from-bottom and drop-over-bottom)`);
      } else if (fromBottom && overTop) {
        console.log(`${dragType}to${dropType} (drag-from-bottom and drop-over-top)`);
      } else if (fromTop && offset == 'middle') {
        console.log(`${dragType}to${dropType} (drag-from-top and drop-over-middle)`);
      } else if (fromBottom && offset == 'middle') {
        dropIndex = dropIndex + 1;
        console.log(`${dragType}to${dropType} (drag-from-bottom and drop-over-middle)`);
      } else if (overBottom) {
        dropIndex = dropIndex + dropCounts;
        console.log(`${dragType}to${dropType} (drag and drop-over-bottom)`);
      }
    }

    return {
      dragIndex,
      dropIndex,
      dragCounts,
      dropCounts,
      dragIds,
      dropIds,
      parentId: (offset == 'middle') ? dropId : dropParentId
    }

  }

  private count(data, ids = []) {

    if (data instanceof Array) {
      data.reduce((a, v) => {
        ids.push(v.id.toString());
        return a + (v.role == 'block' ? this.count(v.data, ids) : 0);
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
