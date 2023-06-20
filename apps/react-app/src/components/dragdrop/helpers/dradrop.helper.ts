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

  formatKebabCase(str: string) {
    return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  }

  findDropPosition(
    dragPosition = 0,
    dropPosition = 0,
    offset: string
  ): string {
    const overTop = offset.includes('top');
    const overBottom = offset.includes('bottom');
    const overMiddle = offset.includes('middle');

    const fromTop = dragPosition < dropPosition;
    const fromBottom = dragPosition > dropPosition;

    const obj = {
      fromTopOverTop: fromTop && overTop,
      fromTopOverBottom: fromTop && overBottom,
      fromTopOverMiddle: fromTop && overMiddle,
      fromBottomOverTop: fromBottom && overTop,
      fromBottomOverBottom: fromBottom && overBottom,
      fromBottomOverMiddle: fromBottom && overMiddle
    };

    const position = Object.entries(obj)
      .filter(([, value]) => value === true)
      .map(([key]) => key)[0] || '';

    return this.formatKebabCase(position);
  }


  findDropIndex(dragItem: Field, dropItem: Field, offset: string) {
    return 5;
  }

}

export const dndHelper = new DragDropHelper(utils);