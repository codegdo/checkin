import { UtilsInterface, utils } from '@libs/shared-code';
import { DataType, Field } from '../../types';
import { XYCoord } from 'react-dnd';

interface FindDropPositionParams {
  dragIndex: number;
  dropIndex: number;
  offset: string;
}

class DragDropHelper {
  private utils: UtilsInterface;

  constructor(utils: UtilsInterface) {
    this.utils = utils;
  }

  normalizeData(data: Field[]) {
    const cloneData = utils.objClone(data);
    const list: Field[] = [];

    cloneData.forEach((item: Field) => {
      return utils.mapToParent(list, item, (item: Field) => (item.dataType == DataType.SECTION || item.dataType == DataType.BLOCK));
    });

    return [{
      id: 'dropArea',
      name: 'area',
      type: 'div',
      dataType: DataType.AREA,
      parentId: null,
      data: [...list]
    }];
  }

  isDragEnabled(
    list: Field[],
    item: Field,
    condition: (item: Field) => boolean
  ): boolean {
    return !list.some((i) => condition(i) && i.id == item.id);
  }

  generateNewId() {
    return utils.strRandom();
  }

  formatKebabCase(str: string) {
    return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  }

  findDropPosition({
    dragIndex,
    dropIndex,
    offset
  }: FindDropPositionParams): string {
    const overTop = offset === 'on-top';
    const overBottom = offset === 'on-bottom';
    const overMiddle = offset === 'on-middle';

    const fromTop = dragIndex < dropIndex;
    const fromBottom = dragIndex > dropIndex;

    const position = {
      'from-top-over-top': fromTop && overTop,
      'from-top-over-bottom': fromTop && overBottom,
      'from-top-over-middle': fromTop && overMiddle,
      'from-bottom-over-top': fromBottom && overTop,
      'from-bottom-over-bottom': fromBottom && overBottom,
      'from-bottom-over-middle': fromBottom && overMiddle
    };

    return Object.entries(position)
      .filter(([, value]) => value === true)
      .map(([key]) => key)[0] || '';
  }

  snapToGrid(x: number, y: number): [number, number] {
    const snappedX = Math.round(x / 32) * 32
    const snappedY = Math.round(y / 32) * 32
    return [snappedX, snappedY]
  }

  getDragPreviewStyles(
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null,
    isSnapToGrid: boolean,
  ) {
    if (!initialOffset || !currentOffset) {
      return {
        display: 'none',
      };
    }

    let { x, y } = currentOffset;

    if (isSnapToGrid) {
      x -= initialOffset.x;
      y -= initialOffset.y;
      [x, y] = this.snapToGrid(x, y);
      x += initialOffset.x;
      y += initialOffset.y;
    }

    const transform = `translate(${x}px, ${y}px)`;

    return {
      transform,
      WebkitTransform: transform,
    };
  }

}

export const dndHelper = new DragDropHelper(utils);