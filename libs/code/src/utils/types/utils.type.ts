export interface Item {
  id: number | string;
  parentId?: number | string;
  data?: Item[];
  // Add additional properties as needed
}

export interface UtilsInterface {
  objClone<T>(obj: T): T;
  strRandom(prefix?: string, separator?: string): string;
  mapToParent<T>(
    list: T[],
    item: T,
    condition: (item: T) => boolean
  ): T[]
}
