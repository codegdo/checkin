import { mapToParent } from "./map-to-parent.util";
interface Item {
  id?: number | string | null;
  parentId?: number | string | null;
  componentType?: string;
  data?: Item[] | null;
}
export function groupData(data: Item[], condition: (item: Item) => boolean) {
  const cloneData = structuredClone(data);
  const list: Item[] = [];

  cloneData.forEach((item: Item) => {
    return mapToParent(list, item, condition);
  });

  console.log('groupDataForRender', cloneData);

  return [{
    id: 'root-area',
    name: 'area',
    type: 'div',
    dataType: 'area',
    parentId: null,
    data: [...list]
  }];
}
