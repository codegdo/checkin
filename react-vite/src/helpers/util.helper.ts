import { DndItem, DndItemType } from '../components';

type Element = DndItem;

type ClassName = string | undefined | null;
type ClassMap = Record<string, boolean>;

type SetObjectValueResult<T> = {
  value: T[keyof T] | null;
  updatedObject: T;
};

type PartialWithIndexSignature<T> = Partial<T> & {
  [key: string]: any;
};


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

  classNames(...args: any[]): string {
    const classes = new Set<ClassName>();

    for (const arg of args) {
      if (typeof arg === 'string') {
        classes.add(arg);
      } else if (typeof arg === 'object' && arg !== null) {
        const classMap = arg as ClassMap;
        for (const [className, enabled] of Object.entries(classMap)) {
          if (enabled) {
            classes.add(className);
          }
        }
      }
    }

    return Array.from(classes).filter((c) => !!c).join(' ');
  }

  /**
   * Returns an object containing the value at the specified property path
   * in the given object, and a new object with the same values but with
   * the value at the specified property path updated to the given value (if
   * provided).
   *
   * @param object - The object to search for the property path.
   * @param propertyPath - The property path to search for (in dot notation).
   * @param value - The value to set at the specified property path (optional).
   * @returns An object containing the value at the specified property path
   * and the updated object.
  */
  getSetObjectValue<T extends Record<string, any>>(
    object: T,
    propertyPath: string,
    value?: T[keyof T]
  ): SetObjectValueResult<T> {
    const propertyNames = propertyPath.split('.');
    let updatedObject: Record<string, any> = { ...object };
    let currentValue: any = object;

    for (let i = 0; i < propertyNames.length; i++) {
      const propertyName = propertyNames[i];

      if (typeof propertyName !== 'string') {
        throw new Error('Property names must be strings');
      }

      if (currentValue[propertyName] === undefined) {
        if (i === propertyNames.length - 1) {
          currentValue[propertyName] = value ?? null;
        } else {
          currentValue[propertyName] = {};
        }
      }

      if (i === propertyNames.length - 1) {
        if (value !== undefined) {
          currentValue[propertyName] = value;
        }

        return { value: currentValue[propertyName], updatedObject: updatedObject as T };
      }

      updatedObject[propertyName] = { ...currentValue[propertyName] };
      currentValue = currentValue[propertyName];
    }

    return { value: null, updatedObject: updatedObject as T };
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

Output:
{
  'Fruit': [
    { name: 'Apple', category: 'Fruit' },
    { name: 'Banana', category: 'Fruit' },
  ],
  'Vegetable': [
    { name: 'Carrot', category: 'Vegetable' },
    { name: 'Broccoli', category: 'Vegetable' },
  ],
}



const obj = {
  name: 'John',
  age: 25,
  address: {
    city: 'New York',
    state: 'NY',
    country: 'USA'
  }
};

const result = getSetObjectValue(obj, 'address.zip', '10001');

Output:
{
  value: '10001',
  updatedObject: {
    name: 'John',
    age: 25,
    address: {
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zip: '10001'
    }
  }
}
*/
