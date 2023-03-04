import { DndItem, DndItemType } from '../components';
import UtilHelper, { util } from './util.helper';

class DragDropHelper {
  private util: UtilHelper;

  constructor(util: UtilHelper) {
    this.util = util;
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
    elementWidth: number;
    elementHeight: number;
  } {
    let elementWidth = 0;
    let elementHeight = 0;

    if (element.classList.contains('-empty')) {
      const style = window.getComputedStyle(element, ':after');
      elementWidth = (parseFloat(style.width) || 0) / 2;
      elementHeight = (parseFloat(style.height) || 0) / 2;
    }

    return { elementWidth, elementHeight };
  }
}

export const dndHelper = new DragDropHelper(util);
export default DragDropHelper;
