import { Item } from "./types";

function mapToParent<T extends Item>(
  list: T[],
  item: T,
  condition: (item: T) => boolean
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
      if (condition(child)) {
        if (!child.data) {
          child.data = [];
        }
        if (mapToParent(child.data as T[], { ...item }, condition)) {
          return true;
        }
      }
    }
    // If parent is not found in the list, return false
    return false;
  }
}

export default mapToParent;
