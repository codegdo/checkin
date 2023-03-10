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
    return data?.reduce((acc: string[], curr: Item) => {
      const currId = `${curr.id}`;
      acc.push(currId);
      if (curr.dataType === 'block') {
        this.countIdsRecursive(curr.data, ids);
      }
      return acc;
    }, ids);
  }

  countItems<T extends Item>({ id, data = [] }: T): [number, string[]] {
    if (id === null) {
      id = '';
    }

    const ids = this.countIdsRecursive(data, [`${id}`]);
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

  // The function takes two parameters, dragItem and dropRef, which are both of the Item type.
  // It returns an object with various properties that are used to calculate the position of the drag item in relation to the drop item.
  calculateDropIndex<T extends Item>(dragItem: T, dropRef: T) {

    // Extract the id, data type, and position of the drag and drop items.
    const dragId = dragItem.id;
    const dragDataType = dragItem.dataType;
    const dragPosition = dragItem.position;
    const dropId = dropRef.id;
    const dropDataType = dropRef.dataType;
    const dropPosition = dropRef.position;
    const dropParentId = dropRef.parentId;
    const dropChildId = dropRef.childId;
    const dropOffset = dropRef.offset;

    // Get the number of items in the drag and drop blocks, as well as their ids.
    const [dragCounts, dragIds] = this.countItems(dragItem);
    const [dropCounts, dropIds] = this.countItems(dropRef);

    // Remove suffix from dropItemId if it's a placeholder
    const strippedDropId = dropDataType === 'placeholder' ? `${dropId}`.split('_')[0] : `${dropId}`;

    // Prevent drag block drop over nested children
    // If the ids of the drag items include the stripped drop item id, it means that the drag item is nested inside the drop item.
    // In this case, we return null to indicate that the drag item cannot be dropped on the drop item.
    if (dragIds.includes(strippedDropId)) {
      return null;
    }

    // Reset dropItemParentId to null if dropRef is an area
    // If the drop item is an area, set the newParentId to null, indicating that the dragged items will not have a parent.
    // If it's not an area, set the newParentId to the id of the drop item, indicating that the dragged items will have the drop item as their parent.
    // reset parentId to null if area

    const newParentId =
      dropOffset === 'middle'
        ? dropDataType === 'area'
          ? null
          : strippedDropId
        : dropParentId;

    // Calculate the position of the drag item in relation to the drop item.
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
    } = this.calculateDropPosition(dragPosition, dropPosition, dropOffset);

    // Set the initial index of the dragged item.
    let dropIndex = dropPosition;

    // Check if the drag and drop items are of the same type (field-field, field-element, element-element, field-placeholder, element-placeholder, block-placeholder).
    const isFieldOrElementDrop = ['field_field', 'field_element', 'element_element'].includes(`${dragDataType}_${dropDataType}`);
    const isPlaceholderDrop = ['field_placeholder', 'element_placeholder', 'block_placeholder'].includes(`${dragDataType}_${dropDataType}`);

    // Determine the drop index based on the drag and drop action
    if (isFieldOrElementDrop) {
      // If dragging from top and over top, drop above the current drop position
      if (isDraggingFromTopOverTop) {
        dropIndex = dropPosition - 1;
      }
      // If dragging from top and over bottom, drop below the current drop position
      else if (isDraggingFromTopOverBottom) {
        dropIndex = dropPosition + 1;
      }
      // If not dragging from top and not over bottom, drop above the current drop position
      else {
        dropIndex = isOverBottom ? dropPosition + 1 : dropPosition;
      }
    }
    // If dragging over a placeholder, adjust the drop position based on the number of items being dragged and dropped
    else if (isPlaceholderDrop) {
      // If dragging from top and over the middle, drop items below the current drop position
      if (isDraggingFromTopOverMiddle) {
        const itemsToInsert = dropCounts - dragCounts;
        dropIndex = dropPosition + dropCounts - dragCounts;
      }
      // If dragging from bottom and over the middle, drop items above the current drop position
      else if (isDraggingFromBottomOverMiddle) {
        dropIndex = dropPosition + dropCounts;
      }
      // If not dragging from top or bottom, drop items below the current drop position
      else {
        dropIndex = dropPosition + 1;
      }
    }
    // If not dragging over a field, adjust the drop position based on the drag and drop action and the number of items being dragged and dropped
    else {
      const isDragIdIncludedInDrop = dropIds.includes(`${dragId}`);
      const isDraggingNewItem = dragPosition === null;

      // If dragging from top and over top, drop items above the current drop position
      if (isDraggingFromTopOverTop) {
        dropIndex = dropPosition - dragCounts;
      }
      // If dragging from top and over bottom, drop items below the current drop position
      else if (isDraggingFromTopOverBottom) {
        const itemsToInsert = dropCounts - dragCounts;
        dropIndex = dropPosition + itemsToInsert;
      }
      // If dragging from bottom and over bottom, adjust the drop position based on whether the dragged item is included in the drop area
      else if (isDraggingFromBottomOverBottom) {
        const itemsToInsert = isDragIdIncludedInDrop ? dropCounts - dragCounts : dropCounts;
        dropIndex = dropPosition + itemsToInsert;
      }
      // If dragging from bottom and over middle, drop items below the current drop position
      else if (isDraggingFromBottomOverMiddle) {
        dropIndex = dropPosition + 1;
      }
      // If not dragging from top or bottom and not over bottom or middle, adjust the drop position based on whether the dragged item is over the top or middle
      else if (isDraggingNewItem) {
        dropIndex = isOverBottom ? dropPosition + dropCounts : isOverMiddle ? dropPosition + 1 : dropPosition;
      }
    }

    // Return updated object with properties
    return {
      dragId,
      dragDataType,
      dragIndex: dragPosition,
      dragCounts,

      dropId,
      dropDataType,
      dropIndex,
      dropCounts,
      dropParentId: newParentId,
      dropChildId,
      dropOffset,
    }
  }

  addItems<T extends Item>(dragItem: T, dropRef: T, data: T[]): T[] {

    // Calculate the new drop index and other relevant information.
    const result = this.calculateDropIndex(dragItem, dropRef);

    console.log(result);

    // If the drop index could not be calculated, return the original data.
    if (!result) {
      return data;
    }

    // Destructure the relevant information from the result.
    const { dragIndex, dragCounts, dropIndex, dropParentId, dropChildId } = result;

    const newDraggedItem = {
      ...dragItem,
      parentId: dropParentId,
      childId: dropChildId
    }

    const updatedData = [...data];
    updatedData.splice(dropIndex, 0, newDraggedItem);
    updatedData.forEach((item, index) => item.position = index);

    console.log('RESULT', updatedData);

    return updatedData;
  }

  /**
   * Move the dragged items to the new drop position.
   * @param dragItem The item being dragged.
   * @param dropRef The item being dropped on.
   * @param data The array of items to update.
   * @returns An updated array of items with the dragged items moved to the new position.
   */
  moveItems<T extends Item>(dragItem: T, dropRef: T, data: T[]): T[] {
    // Calculate the new drop index and other relevant information.
    const result = this.calculateDropIndex(dragItem, dropRef);

    // If the drop index could not be calculated, return the original data.
    if (!result) {
      return data;
    }

    console.log('RESULT', result);

    // Destructure the relevant information from the result.
    const { dragIndex, dragCounts, dropIndex, dropParentId, dropChildId } = result;

    // Update the parentId and childId properties of the dragged item.
    // data[dragIndex].parentId = dropParentId;
    // data[dragIndex].childId = dropChildId;

    // Get the items that were dragged and the remaining items.
    const draggedItems = data.slice(dragIndex, dragIndex + dragCounts);
    const remainingItems = data.filter((_, index) => index < dragIndex || index >= dragIndex + dragCounts);

    // Update the dragged item that match dragIndex to have the new parent and child IDs.
    const updatedDraggedItems = draggedItems.map(item => {
      if (item.position === dragIndex) {
        item.parentId = dropParentId;
        item.childId = dropChildId;
      }
      return item;
    });

    // Rebuild the data array with the updated items and positions.
    const updatedData = [
      ...remainingItems.slice(0, dropIndex),
      ...updatedDraggedItems,
      ...remainingItems.slice(dropIndex)
    ].map((item, index) => ({
      ...item,
      position: index,
    }));

    // Return the updated data array.
    return updatedData;
  }

  deleteItem<T extends Item>(deleteItem: T, data: T[]): T[] {
    const dragIndex = deleteItem.position;
    const [deleteCounts] = this.countItems(deleteItem);
    const newData = [
      ...data.slice(0, dragIndex),
      ...data.slice(dragIndex + deleteCounts)
    ].map((item: T, index: number) => ({ ...item, position: index }));

    return [];
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
        (item) => item.dataType === DndItemType.BLOCK
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

  newId() {
    return util.randomString();
  }
}

export const dndHelper = new DragDropHelper(util);
export default DragDropHelper;

/* // Create an array to hold the dragged items.
    const draggedItems: any = [];

    // Add the dragged items to the `draggedItems` array.
    for (let i = 0; i < dragCounts; i++) {
      draggedItems.push(data[dragIndex + i]);
    }

    // Update the `data` array using the `update` function.
    const updatedData = update(data, {
      // Remove the dragged items from their current location in the array.
      $splice: [
        [dragIndex, dragCounts],
        // Add the dragged items at the new drop index.
        [dropIndex, 0, ...draggedItems],
      ],
      // Update the position property of each item in the array.
      $apply: (data: any) =>
        data.filter((item: any, index: number) => {
          item.position = index;
          return item;
        }),
    });

    // Return the updated data array.
    return updatedData; */
