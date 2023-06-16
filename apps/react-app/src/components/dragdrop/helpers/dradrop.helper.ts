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

}

export const dndHelper = new DragDropHelper(utils);