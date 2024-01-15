import { Item, mapToParent } from "./map-to-parent.util";

export const groupDataForRender = <T extends Item>(data: T[]) => {
  const cloneData = structuredClone(data);
  const list: T[] = [];

  const condition = (item: T) => ['area', 'section', 'block', 'list', 'placeholder'].includes(item.type);

  cloneData.forEach((item: T) => {
    return mapToParent<T>(list as T[], item, condition);
  });

  return list;
}