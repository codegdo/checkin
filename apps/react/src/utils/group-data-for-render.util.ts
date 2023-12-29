import { mapToParent } from "./map-to-parent.util";
interface Item {
  id?: number | string | null;
  parentId?: number | string | null;
  dataType?: string;
  data?: Item[] | null;
}
export function groupDataForRender(data: Item[]) {
  const cloneData = structuredClone(data);
  const list: Item[] = [];

  cloneData.forEach((item: Item) => {
    return mapToParent(list, JSON.parse(JSON.stringify(item)), (item: Item) => (
      item?.dataType === 'area' ||
      item?.dataType === 'block' ||
      item?.dataType === 'section' ||
      item?.dataType === 'list'
    ));
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
