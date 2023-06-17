import { UtilsInterface, utils } from '@libs/shared-code';
import { DataType, Field } from '../../types';

class DragDropHelper {
  private utils: UtilsInterface;

  constructor(utils: UtilsInterface) {
    this.utils = utils;
  }

  normalizeData(data: Field[]) {
    const cloneData = this.utils.objClone(data);
    const list: Field[] = [];

    cloneData.forEach((item: Field) => {
      return this.utils.mapToParent<Field>(list, item, (item: Field) => (item.dataType == DataType.SECTION || item.dataType == DataType.BLOCK));
    });

    return [{
      id: 'dropArea',
      name: 'area',
      type: 'div',
      dataType: DataType.AREA,
      data: [...list]
    }];
  }

  determineDirectionX(startX: number | null, endX: number | null, clientX: number): string | undefined {
    if (startX === null) {
      startX = clientX;
    } else {
      endX = clientX;

      if (endX < startX) {
        // Mouse is moving left
        startX = endX;
        return 'left';
      } else if (endX > startX) {
        // Mouse is moving right
        // Move the mouse right down
        window.scrollBy(0, 1);
        startX = endX;
        return 'right';
      } else {
        return 'no movement'
      }
    }
  }

  determineDirectionY(startY: number | null, endY: number | null, clientY: number): string | undefined {
    if (startY === null) {
      startY = clientY;
    } else {
      endY = clientY;

      if (endY < startY) {
        // Mouse is moving up
        startY = endY;
        return 'up';
      } else if (endY > startY) {
        // Mouse is moving down
        // Move the mouse back down
        window.scrollBy(0, 1);
        startY = endY;
        return 'down';
      } else {
        return 'no movement'
      }
    }
  }

}

export const dndHelper = new DragDropHelper(utils);