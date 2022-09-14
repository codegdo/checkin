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
    const ids = this.count(data, [id.toString()]);

    return [ids.length, ids]
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
