export interface Item {
  id: number | string;
  parentId?: number | string | null;
  data?: Item[] | null;
  // Add additional properties as needed
}

export interface UtilsInterface {
  objClone<T>(obj: T): T;
  strRandom(prefix?: string, separator?: string): string;
  mapToParent<T extends Item>(
    list: T[],
    item: T,
    condition: (item: T) => boolean
  ): boolean
}
