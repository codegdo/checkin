import { Item } from "./types";

function countItems<T extends Item>(
  data: T[] = [],
  condition: (item: T) => boolean
): string[] {

  return data.reduce((acc: string[], item: T) => {
    const itemId = `${item.id}`;
    acc.push(itemId);

    if (condition(item) && item.data !== null) {
      const childItems = countItems<T>(item.data as T[], condition);
      acc.push(...childItems);
    }

    return acc;
  }, []);
}

export default countItems;
