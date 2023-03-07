import { DndItem, DndItemType } from '../components';

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

  filterArray(
    arr: Element[],
    condition: (item: Element) => boolean
  ): [Element[], Element[]] {
    const filtered1: Element[] = [];
    const filtered2: Element[] = [];

    arr.forEach((item) => {
      if (condition(item)) {
        filtered1.push(item);
      } else {
        filtered2.push(item);
      }
    });

    return [filtered1, filtered2];
  }

  mapToParent(
    list: Element[],
    item: Element,
    condition: (item: Element) => boolean
  ): boolean {
    // If item has no parent, add it to the top-level of the list
    if (item.parentId == null) {
      list.push({ ...item });
      return true;
    }

    // Find the parent element in the list
    const parent = list.find((i) => i.id === item.parentId);
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

  randomString(prefix?: string, separator: string = '-') {
    const randomChar = 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26));
    const randomString = Math.random().toString(16).slice(4, 9);
    const str = prefix ? `${prefix}${separator}${randomString}` : `${randomChar}${separator}${randomString}`;

    return str;
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

const [filtered1, filtered2] = filterArray(arr, item => item.dataType === 'block');

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
