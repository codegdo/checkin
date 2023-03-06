import { DndItem, DndItemType } from '../components';
import UtilHelper, { util } from './util.helper';

interface Item {
  id: number | string;
  dataType: string;
  position: number;
  data: any;
  parentId: string | null;
  childId: string | null;
  offset?: string;
}

class DragDropHelper {
  private util: UtilHelper;

  constructor(util: UtilHelper) {
    this.util = util;
  }

  countIdsRecursive(data: Item[], ids: string[] = []): string[] {
    return data.reduce((acc: string[], curr: Item) => {
      const currId = curr.id.toString();
      acc.push(currId);
      if (curr.dataType === 'block') {
        this.countIdsRecursive(curr.data, ids);
      }
      return acc;
    }, ids);
  }

  countItems<T extends Item>({ id, data }: T): [number, string[]] {
    if (id === null) {
      id = '';
    }

    const ids = this.countIdsRecursive(data, [id.toString()]);
    return [ids.length, ids];
  }

  calculateDropPosition(
    dragIndex: number | null,
    dropIndex: number,
    offset?: string
  ) {
    const isOverTop = offset === 'top' || offset === 'left';
    const isOverBottom = offset === 'bottom' || offset === 'right';
    const isOverMiddle = offset === 'middle';

    if (dragIndex === null) {
      return {
        isDraggingFromTopOverTop: false,
        isDraggingFromTopOverMiddle: false,
        isDraggingFromTopOverBottom: false,
        isDraggingFromBottomOverTop: false,
        isDraggingFromBottomOverMiddle: false,
        isDraggingFromBottomOverBottom: false,
        isOverTop,
        isOverBottom,
        isOverMiddle
      };
    }

    const isDraggingFromTop = dragIndex < dropIndex;
    const isDraggingFromBottom = dragIndex > dropIndex;

    return {
      isDraggingFromTopOverTop: isDraggingFromTop && isOverTop,
      isDraggingFromTopOverMiddle: isDraggingFromTop && isOverMiddle,
      isDraggingFromTopOverBottom: isDraggingFromTop && isOverBottom,
      isDraggingFromBottomOverTop: isDraggingFromBottom && isOverTop,
      isDraggingFromBottomOverMiddle: isDraggingFromBottom && isOverMiddle,
      isDraggingFromBottomOverBottom: isDraggingFromBottom && isOverBottom,
      isOverTop,
      isOverBottom,
      isOverMiddle
    };
  }

  findDropIndex<
    T extends Item
  >(dragItem: T, dropRef: T) {
    const {
      id: dragId,
      dataType: dragDataType,
      position: dragIndex,
    } = dragItem;
    const {
      id: dropId,
      dataType: dropDataType,
      position: dropIndex,
      parentId,
      childId,
      offset,
    } = dropRef;

    const [dragCounts, dragIds] = this.countItems(dragItem);
    const [dropCounts, dropIds] = this.countItems(dropRef);

    // Remove suffix from dropId if it's a placeholder
    const strippedDropId =
      dropDataType === 'placeholder' ? `${dropId}`.split('_')[0] : `${dropId}`;

    // Prevent drag block drop over nested children
    if (dragIds.includes(strippedDropId)) {
      return null;
    }

    // Reset parentId to null if area
    const newParentId =
      offset === 'middle'
        ? dropDataType === 'area'
          ? null
          : strippedDropId
        : parentId;

    const {
      isDraggingFromTopOverTop,
      isDraggingFromTopOverMiddle,
      isDraggingFromTopOverBottom,
      isDraggingFromBottomOverTop,
      isDraggingFromBottomOverMiddle,
      isDraggingFromBottomOverBottom,
      isOverTop,
      isOverBottom,
      isOverMiddle
    } = this.calculateDropPosition(dragIndex, dropIndex, offset);

    let dropIndexDelta = 0;

    if (
      ['field_field', 'field_element', 'element_element'].includes(
        `${dragDataType}_${dropDataType}`
      )
    ) {
      if (isDraggingFromTopOverTop) {
        dropIndexDelta = dropIndex - 1;
      } else if (isDraggingFromTopOverBottom) {
        dropIndexDelta = dropIndex + 1;
      } else {
        dropIndexDelta = isOverBottom ? dropIndex + 1 : dropIndex - 1;
      }
    } else if (
      [
        'field_placeholder',
        'element_placeholder',
        'block_placeholder',
      ].includes(`${dragDataType}_${dropDataType}`)
    ) {
      if (isDraggingFromTopOverMiddle) {
        dropIndexDelta = dropIndex + dropCounts - dragCounts;
      } else if (isDraggingFromBottomOverMiddle) {
        dropIndexDelta = dropIndex + dropCounts;
      } else {
        dropIndexDelta = dropIndex + 1;
      }
    } else {
      if (isDraggingFromTopOverTop) {
        dropIndexDelta = dropIndex - dragCounts;
      } else if (isDraggingFromTopOverBottom) {
        dropIndexDelta = dropIndex + dropCounts - dragCounts;
      } else if (isDraggingFromBottomOverBottom) {
        dropIndexDelta = dropIds.includes(`${dragId}`)
          ? dropIndex + dropCounts - dragCounts
          : dropIndex + dropCounts;
      } else if (isDraggingFromBottomOverMiddle) {
        dropIndexDelta = dropIndex + 1;
      } else {
        dropIndexDelta = isOverBottom ? dropIndex + dropCounts : isOverMiddle ? dropIndex + 1 : dropIndex - 1;
      }
    }

    const output = {
      dragIndex,
      dropIndex: dropIndexDelta,
      dragCounts,
      dropCounts,
      dragIds,
      dropIds,
      dragDataType,
      dropDataType,
      newParentId,
      newChildId: childId,
      offset,
    };

    return output;
  }

  moveItems<T extends Item>(dragItem: T, dropRef: T, data: T[]) {
    const foundResult = this.findDropIndex(dragItem, dropRef);

    if (!foundResult) {
      return data;
    }

    console.log('FOUND RESULT', foundResult);

    const { dragIndex, dropIndex, dragCounts, newParentId, newChildId } = foundResult;

    const draggedItems = data.slice(dragIndex, dragIndex + dragCounts);
    const remainingItems = data.filter((_, index) => index < dragIndex || index >= dragIndex + dragCounts);

    const updatedDraggedItems = draggedItems.map(item => ({
      ...item,
      parentId: newParentId,
      childId: newChildId,
    }));

    const updatedData = [
      ...remainingItems.slice(0, dropIndex),
      ...updatedDraggedItems,
      ...remainingItems.slice(dropIndex)
    ].map((item, index) => ({
      ...item,
      position: index,
    }));

    return updatedData;
  }

  hoverOffsetX(
    clientX: number,
    middleX: number,
    targetWidth: number
  ): 'left' | 'right' | 'middle' {
    return clientX <= middleX - targetWidth
      ? 'left'
      : clientX >= middleX + targetWidth
        ? 'right'
        : 'middle';
  }

  hoverOffsetY(
    clientY: number,
    middleY: number,
    elementHeight: number
  ): 'top' | 'bottom' | 'middle' {
    return clientY <= middleY - elementHeight
      ? 'top'
      : clientY >= middleY + elementHeight
        ? 'bottom'
        : 'middle';
  }

  nomalizeData(data: DndItem[] = []) {
    const cloneData = this.util.cloneDeep(data);

    const list: DndItem[] = [];

    cloneData.forEach((item: DndItem) => {
      return this.util.mapToParent(
        list,
        item,
        (item) => item.dataType === DndItemType.Block
      );
    });

    return list;
  }

  getElementDisplay(element: HTMLElement): string {
    const parentNode = element.parentNode as HTMLElement;

    if (!parentNode) {
      return 'column';
    }

    const computedParentStyle = window.getComputedStyle(parentNode);
    const parentDisplayStyle =
      parentNode.style.display || computedParentStyle.display;
    const parentFlexDirection =
      parentNode.style.flexDirection || computedParentStyle.flexDirection;

    if (parentDisplayStyle !== 'flex') {
      return 'column';
    }

    if (!parentFlexDirection.includes('column') || parentFlexDirection === '') {
      return 'row';
    }

    return 'column';
  }

  getElementSize(element: HTMLElement): {
    width: number;
    height: number;
  } {
    let width = 0;
    let height = 0;

    if (element.classList.contains('is-empty')) {
      const style = window.getComputedStyle(element, ':after');
      width = (parseFloat(style.width) || 0) / 2;
      height = (parseFloat(style.height) || 0) / 2;
    }

    return { width, height };
  }
}

export const dndHelper = new DragDropHelper(util);
export default DragDropHelper;
