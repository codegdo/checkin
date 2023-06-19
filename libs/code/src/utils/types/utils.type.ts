export interface Item {
  id: number | string;
  parentId?: number | string | null;
  data?: Item[] | null;
  // Add additional properties as needed
}

export type StrClassName = string | undefined | null;
export type StrClassObject = Record<string, boolean>;

export interface UtilsInterface {
  objClone<T>(obj: T): T;
  strRandom(prefix?: string, separator?: string): string;
  classNames(...args: (StrClassName | StrClassObject)[]): string;
  mapToParent<T extends Item>(
    list: T[],
    item: T,
    condition: (item: T) => boolean
  ): void;
  countItems<T extends Item>(
    data: T[],
    condition: (item: T) => boolean
  ): string[];
}
