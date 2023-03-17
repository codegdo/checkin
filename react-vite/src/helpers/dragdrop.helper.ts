import { XYCoord } from 'react-dnd';
import { DndItem, DndItemType } from '../components';
import UtilHelper, { util } from './util.helper';

interface Item {
  id?: number | string;
  dataType: string;
  data?: any;
  position?: number;
  parentId?: string | null;
  childId?: string | null;
}

interface DragItem extends Item {
}

interface DropRef extends Item {
  offset?: string;
}

class DragDropHelper {
  private util: UtilHelper;

  constructor(util: UtilHelper) {
    this.util = util;
  }

  // The function takes three arguments: the item being dragged, the item being dropped on, and an array of items.
  // It returns a new array that includes the dragged item at the calculated drop index.
  addItems(dragItem: DragItem, dropRef: DropRef, data: Item[]): Item[] {
    // Calculate the new drop index and other relevant information.
    const result = this.calculateDropIndex(dragItem, dropRef);

    console.log('ADD ITEM RESULT', result);

    // If the drop index could not be calculated, return the original data.
    if (!result) return data;

    // Destructure the relevant information from the result.
    const { dropIndex = 0, dropParentId, dropChildId } = result;

    // If the drop index is greater than the length of the data array, return the original data.
    if (dropIndex > data.length) {
      return data;
    }

    // Create a new object that includes the dragged item with updated parentId and childId.
    const newDraggedItem = {
      ...dragItem,
      parentId: dropParentId,
      childId: dropChildId
    }

    // Clone the original data array into a new array to avoid modifying the original data.
    const updatedData = [...data];

    // Insert the newDraggedItem object into the updatedData array at the drop index.
    updatedData.splice(dropIndex, 0, newDraggedItem);

    // Update the position property of each item in the updatedData array to its current index in the array.
    updatedData.forEach((item, index) => item.position = index);

    // Return the updatedData array.
    return updatedData;
  }

  // The function takes three arguments: the item being dragged, the item being dropped on, and an array of items.
  // It returns an updated array of items with the dragged items moved to the new position.
  moveItems(dragItem: DragItem, dropRef: DropRef, data: Item[]): Item[] {
    // Calculate the new drop index and other relevant information.
    const result = this.calculateDropIndex(dragItem, dropRef);

    // If the drop index could not be calculated, return the original data.
    if (!result) {
      return data;
    }

    // Destructure the relevant information from the result.
    const { dragIndex = 0, dragCounts, dropIndex, dropParentId, dropChildId } = result;

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

  // The function takes two arguments: the item and an array of items.
  // It returns a new array that excludes the items to be removed.
  removeItems(item: Item, data: Item[]): Item[] {
    // Count how many times the item appears in the data array.
    const [numItemsToRemove] = this.countItems(item);

    // Create a new array that excludes the items to be removed.
    // This is done by slicing the data array from the beginning to the position of the item,
    // and then slicing the data array from the position after the last item to be removed to the end.
    const itemPosition = item.position ?? 0;
    const updatedData = [
      ...data.slice(0, item.position),
      ...data.slice(itemPosition + numItemsToRemove)
    ]
      // Map over the updatedData array and update the position property of each item to its current index in the array.
      .map((item: Item, index: number) => ({ ...item, position: index }));

    // Return the updatedData array.
    return updatedData;
  }

  // The function takes two arguments: the item and an array of items.
  // It returns a new array that includes the cloned items along with the original ones.
  cloneItems(itemToClone: Item, data: Item[]): Item[] {
    // Count how many times the itemToClone appears in the data array.
    const [numItemsToClone] = this.countItems(itemToClone);

    // Create a new array to store the cloned items.
    const clonedItems: Item[] = new Array(numItemsToClone);

    // Create a map to store the mapping between the original item IDs and the new item IDs.
    const idMap = new Map<string, string>();

    // Loop through the range of items to be cloned.
    for (let i = 0; i < numItemsToClone; i++) {
      // Get the original item from the data array.
      const itemToClonePosition = itemToClone.position ?? 0;
      const originalItem = data[itemToClonePosition + i];

      // If the original item exists:
      if (originalItem) {
        // Generate a new ID for the cloned item.
        const newId = this.generateNewId();

        // Retrieve the parent ID of the original item from idMap or use the original parent ID if it hasn't been mapped yet.
        const parentId = idMap.get(`${originalItem.parentId}`) || originalItem.parentId;

        // Update the id and parentId properties of the original item to create a new item with a new ID and parentId.
        // Add the new item to the clonedItems array.
        idMap.set(`${originalItem.id}`, newId);
        clonedItems[i] = {
          ...originalItem,
          id: newId,
          parentId,
        };
      }
    }

    // Calculate the position of the last cloned item.
    const lastCloneItemPosition = this.getLastItemPosition(clonedItems) + 1;

    // Create a new array that includes the original data array sliced up to the last cloned item's position,
    // followed by the cloned items array, followed by the remaining part of the original data array.
    const updatedData = [
      ...data.slice(0, lastCloneItemPosition),
      ...clonedItems,
      ...data.slice(lastCloneItemPosition)
    ]
      // Map over the updatedData array and update the position property of each item to its current index in the array.
      .map((item: Item, index: number) => ({ ...item, position: index }));;

    // Log the idMap, clonedItems, and updatedData to the console.
    console.log(idMap, clonedItems, updatedData);

    // Return the updatedData array.
    return updatedData;
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

  countItems({ id, data = [] }: Item): [number, string[]] {
    if (id === null) {
      id = '';
    }

    const ids = this.countIdsRecursive(data, [`${id}`]);
    return [ids.length, ids];
  }

  calculateDropPosition(
    dragIndex: number,
    dropIndex: number,
    offset: string
  ) {
    const isOverTop = offset === 'top' || offset === 'left';
    const isOverBottom = offset === 'bottom' || offset === 'right';
    const isOverMiddle = offset === 'middle';

    if (dragIndex === -1) {
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
  calculateDropIndex(dragItem: DragItem, dropRef: DropRef) {

    // Extract the id, data type, and position of the drag and drop items.
    const dragId = dragItem.id;
    const dragDataType = dragItem.dataType;
    const dragPosition = dragItem.position ?? 0;
    const dropId = dropRef.id;
    const dropDataType = dropRef.dataType;
    const dropPosition = dropRef.position ?? 0;
    const dropParentId = dropRef.parentId;
    const dropChildId = dropRef.childId;
    const dropOffset = dropRef.offset || 'bottom';

    // Get the number of items in the drag and drop blocks, as well as their ids.
    const [dragCounts, dragIds] = this.countItems(dragItem);
    const [dropCounts, dropIds] = this.countItems(dropRef);

    // Remove suffix from dropItemId if it's a placeholder
    const placeholderParentId = dropDataType === 'placeholder' ? `${dropId}`.split('_')[0] : `${dropId}`;

    // Check if any of the drag item ids match the stripped drop item id.
    // If yes, it means that the drag item is nested inside the drop item, so we return true.
    //const isDropOnNestedChildren = this.checkDragItemDroppedOnNestedItem(dragIds, strippedDropId);
    //if (isDropOnNestedChildren) return null;

    // Reset dropItemParentId to null if dropRef is an area
    // If the drop item is an area, set the newParentId to null, indicating that the dragged items will not have a parent.
    // If it's not an area, set the newParentId to the id of the drop item, indicating that the dragged items will have the drop item as their parent.
    // reset parentId to null if area
    const newParentId =
      dropOffset === 'middle'
        ? dropDataType === 'area'
          ? null
          : placeholderParentId
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
        dropIndex = dropPosition + itemsToInsert;
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
      const isDraggingNewItem = dragPosition === -1;

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
      // If dragging is new item, adjust the drop position based on whether the dragged item is over the top, bottom or middle
      else if (isDraggingNewItem) {
        dropIndex = isOverBottom
          ? dropPosition + dropCounts
          : isOverMiddle
            ? dropPosition + 1
            : dropPosition;
      }
    }

    // Return updated object with properties
    return {
      dragId,
      dragIds,
      dragDataType,
      dragIndex: dragPosition,
      dragCounts,

      dropId,
      dropIds,
      dropDataType,
      dropIndex,
      dropCounts,
      dropParentId: newParentId,
      dropChildId,
      dropOffset,
    }
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

  snapToGrid(x: number, y: number): [number, number] {
    const snappedX = Math.round(x / 32) * 32
    const snappedY = Math.round(y / 32) * 32
    return [snappedX, snappedY]
  }

  checkDragItemDroppedOnNestedItem(dragItemIds: string[], dropItemId: string) {
    // Check if any of the drag item ids match the stripped drop item id.
    // If yes, it means that the drag item is nested inside the drop item, so we return true.
    return dragItemIds.some((dragItemId) => dragItemId === dropItemId);

  }

  // Returns the styles for an item that is being dragged and dropped
  getItemStyles(
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null,
    isSnapToGrid: boolean,
  ) {
    // If either initialOffset or currentOffset is null, return the styles to hide the item
    if (!initialOffset || !currentOffset) {
      return {
        display: 'none',
      };
    }

    // Calculate the new x and y coordinates based on the current offset and whether snapping to grid is enabled
    let { x, y } = currentOffset;

    if (isSnapToGrid) {
      x -= initialOffset.x;
      y -= initialOffset.y;
      [x, y] = this.snapToGrid(x, y);
      x += initialOffset.x;
      y += initialOffset.y;
    }

    // Create the transform style with the new x and y coordinates
    const transform = `translate(${x}px, ${y}px)`;

    // Return an object with the transform style and its Webkit version
    return {
      transform,
      WebkitTransform: transform,
    };
  }

  getLastItemPosition<T extends Item>(items: T[]): number {
    const endIndex = items.length - 1;
    return endIndex >= 0 ? items[endIndex].position ?? -1 : -1;
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

  getElementSize(element: HTMLElement) {
    let width = 0;
    let height = 0;

    if (element.classList.contains('is-empty')) {
      const style = window.getComputedStyle(element, ':after');
      width = (parseFloat(style.width) || 0) / 2;
      height = (parseFloat(style.height) || 0) / 2;
    } else {
      const childNodes = Array.from(element.childNodes) as HTMLElement[];
      childNodes.forEach((child) => {
        if (child instanceof HTMLElement) {
          width += child.clientWidth / 2;
          height += child.clientHeight / 2;
        }
      });
    }
    console.log(width, height);
    return { width, height };
  }

  generateNewId() {
    return util.randomString();
  }
}

export const dndHelper = new DragDropHelper(util);
export default DragDropHelper;
