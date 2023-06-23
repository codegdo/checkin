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
    const cloneData = utils.objClone(data);
    const list: Field[] = [];

    cloneData.forEach((item: Field) => {
      return utils.mapToParent(list, item, (item: Field) => (item.dataType == DataType.BLOCK));
    });

    return [{
      id: 'dropArea',
      name: 'area',
      type: 'div',
      dataType: DataType.AREA,
      data: [...list]
    }];
  }

  // mapToParent<T extends Field>(
  //   list: T[],
  //   item: T,
  //   condition: (item: T) => boolean
  // ): void {
  //   if (item.parentId == null) {
  //     list.push({ ...item });
  //     return;
  //   }

  //   const parent = list.find((i) => i.id == item.parentId);

  //   if (parent) {
  //     if (!parent.data) {
  //       parent.data = [];
  //     }
  //     parent.data.push({ ...item });
  //     //return;
  //   } else {
  //     for (const child of list) {
  //       if (condition(child)) {
  //         if (!child.data) {
  //           child.data = [];
  //         }
  //         this.mapToParent(child.data as T[], { ...item }, condition);
  //         //return;
  //       }
  //     }
  //   }
  // }

  mapToParent(
    list: Field[],
    item: Field,
    condition: (item: Field) => boolean
  ): boolean {
    // If item has no parent, add it to the top-level of the list
    if (item.parentId == null) {
      list.push({ ...item });
      return true;
    }

    // Find the parent element in the list
    const parent = list.find((i) => i.id == item.parentId);
    if (parent) {
      // If parent is found, add the item to its data property
      if (!parent.data) {
        parent.data = [];
      }
      parent.data.push({ ...item });
      return true;
    } else {
      // If parent is not found, recursively search in the child elements
      for (const child of list) {
        if (child.data && condition(child)) {
          if (this.mapToParent(child.data, { ...item }, condition)) {
            return true;
          }
        }
      }
      // If parent is not found in the list, return false
      return false;
    }
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
      'from-bottom-over-top': fromBottom && overTop,
      'from-bottom-over-bottom': fromBottom && overBottom,
      'over-middle': overMiddle
    };

    return Object.entries(position)
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