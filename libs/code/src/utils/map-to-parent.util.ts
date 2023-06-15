import { Item } from "./types";

export function mapToParent<T extends Item>(
  list: T[],
  item: T,
  condition: (item: T) => boolean
): T[] {
  if (condition(item) || !item.parentId) {
    list.push(item);
    return list;
  }

  const parent = list.find((i) => i.id === item.parentId);

  if (parent) {
    if (!parent.data) {
      parent.data = [];
    }
    parent.data.push(item as Item as T); // Type assertion here
    return list;
  }

  for (const child of list) {
    if (child.data && condition(child)) {
      mapToParent(child.data, item, condition);
    }
  }

  return list;
}
