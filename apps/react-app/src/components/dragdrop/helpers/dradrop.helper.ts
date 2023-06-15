import { Item, UtilsInterface, utils } from '@libs/shared-code';
import { Field } from '../../types';

class DragDropHelper {
  private utils: UtilsInterface;

  constructor(utils: UtilsInterface) {
    this.utils = utils;
  }

  nomalizeData(data: Field[]) {
    const cloneData = this.utils.objClone(data);
    const list: Item[] = [];

    cloneData.forEach((item: Item) => {
      return this.utils.mapToParent(list, item, (item) => item.dataType == 'block');
    });
  }
}

export const dndHelper = new DragDropHelper(utils);