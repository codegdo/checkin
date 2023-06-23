import { Item } from "./types";

function mapToParent<T extends Item>(
  list: T[],
  item: T,
  condition: (item: T) => boolean
): void {
  if (item.parentId == null) {
    list.push({ ...item });
    return;
  }

  const parent = list.find((i) => i.id == item.parentId);

  if (parent) {
    if (!parent.data) {
      parent.data = [];
    }
    parent.data.push({ ...item });
    return;
  } else {
    for (const child of list) {
      if (condition(child)) {
        if (!child.data) {
          child.data = [];
        }
        mapToParent(child.data as T[], { ...item }, condition);
        //return;
      }
    }
  }
}


export default mapToParent;
