import { cloneObject, mapToParent } from "../../../utils";
import { Field } from "../types";

class SortableHelper {
  renderData(data: Field[]) {
    const cloneData = cloneObject(data);
    const list: Field[] = [];

    cloneData.forEach((item: Field) => {
      return mapToParent(list, item, (item: Field) => (item.group === 'block'));
    });

    return [{
      id: 'sortable-area',
      name: 'area',
      type: 'div',
      group: 'area',
      parentId: null,
      data: [...list]
    }];
  }
}

export const sortableHelper = new SortableHelper();