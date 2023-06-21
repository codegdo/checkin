import { UtilsInterface, utils } from '@libs/shared-code';
import { DataType, Field } from '../../types';

interface FindDropIndexParams {
  dropPosition: number;
  offsetPosition: string;
  dragCount: number;
  dropChildren: number;
  dataType: string;
}

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

  findDropPosition({
    dragIndex,
    dropIndex,
    offset
  }: FindDropPositionParams): string {
    const overTop = offset.includes('top');
    const overBottom = offset.includes('bottom');
    const overMiddle = offset.includes('middle');

    const fromTop = dragIndex < dropIndex;
    const fromBottom = dragIndex > dropIndex;

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


  findDropIndex({
    dataType,
    dropPosition, 
    offsetPosition, 
    dragCount, 
    dropChildren
  }: FindDropIndexParams) {
    return dropPosition + dropChildren;
  }

}

export const dndHelper = new DragDropHelper(utils);