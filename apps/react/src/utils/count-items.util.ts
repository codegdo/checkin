import { Field } from "@/components/types";

interface Item extends Field { }

export function countItems(item: Item | null, condition: (item: Item) => boolean): string[] {
  if (!item) {
    return [];
  }

  const itemId = `${item.id}`;
  const acc: string[] = [itemId];

  if (condition(item) && item.data !== undefined && item.data !== null) {
    for (const child of item.data) {
      const childItems = countItems(child, condition);
      acc.push(...childItems);
    }
  }

  return acc;
}
