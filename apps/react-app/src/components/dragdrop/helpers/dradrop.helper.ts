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
      'from-top-over-top': fromTop && overTop,
      'from-top-over-bottom': fromTop && overBottom,
      'from-top-over-middle': fromTop && overMiddle,
      'from-bottom-over-top': fromBottom && overTop,
      'from-bottom-over-bottom': fromBottom && overBottom,
      'from-bottom-over-middle': fromBottom && overMiddle
    };

    return Object.entries(obj)
      .filter(([, value]) => value === true)
      .map(([key]) => key)[0] || '';
  }


  findDropIndex(dragItem: Field, dropItem: Field, offset: string) {
    return 5;
  }

}

export const dndHelper = new DragDropHelper(utils);