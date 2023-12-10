interface Item {
  id?: number | string | null;
  dataType: 'section' | 'block' | 'element';
  data?: Item[] | null;
}

export function findItemById(item: Item | null, targetId: string | number, condition: (item: Item) => boolean): Item | null {
  function findRecursive(innerItem: Item | null): Item | null {
    if (!innerItem) {
      return null;
    }

    if (innerItem.id === targetId) {
      return innerItem;
    }

    if (innerItem.data && condition(innerItem)) {
      for (const child of innerItem.data) {
        const found = findRecursive(child);
        if (found) {
          return found;
        }
      }
    }

    return null;
  }

  return findRecursive(item);
}
