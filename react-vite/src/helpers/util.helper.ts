import { DndItem, DndItemType } from "../components";

type Element = DndItem;

class UtilHelper {
  cloneDeep<T>(obj: T): T {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    const copy: any = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
      copy[key] = this.cloneDeep(obj[key]);
    }

    return copy;
  }

  groupBy<T>(array: T[], keyFunc: (item: T) => string): { [key: string]: T[] } {
    return array.reduce((result, item) => {
      const key = keyFunc(item);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    }, {} as { [key: string]: T[] });
  }

  mapToParent(list: Element[], item: Element): boolean {
    if (item.parentId == null) {
      list.push(Object.assign({}, item));
      return true;
    }

    const found = list.some((i) => {
      if (`${i.id}` === `${item.parentId}`) {
        i.data?.push(Object.assign({}, item));
        return true;
      }

      if (
        i.dataType === DndItemType.Block &&
        this.mapToParent(i.data as Element[], Object.assign({}, item))
      ) {
        return true;
      }
      return false;
    });

    if (!found) {
      // console.warn(`Fail mapToParent: ${parentId}`, { id, dataType, data, position, parentId });
    }

    return found;
  }
}

export const util = new UtilHelper();
export default UtilHelper;

/*
const items = [
  { name: 'Apple', category: 'Fruit' },
  { name: 'Banana', category: 'Fruit' },
  { name: 'Carrot', category: 'Vegetable' },
  { name: 'Broccoli', category: 'Vegetable' },
];

const grouped = groupBy(items, 'category');

console.log(grouped);

// Output:
// {
//   'Fruit': [
//     { name: 'Apple', category: 'Fruit' },
//     { name: 'Banana', category: 'Fruit' },
//   ],
//   'Vegetable': [
//     { name: 'Carrot', category: 'Vegetable' },
//     { name: 'Broccoli', category: 'Vegetable' },
//   ],
// }
*/
