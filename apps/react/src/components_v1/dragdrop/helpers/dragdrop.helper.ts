import { mapToParent } from "@/utils";
import { DndField } from "../types";

class DndHelper {

  groupData(data: DndField[]) {
    const cloneData = structuredClone(data);
    const list: DndField[] = [];

    const condition = (item: DndField) => ['area', 'section', 'block', 'list'].includes(item.dataType);

    cloneData.forEach((item: DndField) => {
      return mapToParent(list, item, condition);
    });

    return list;
  }
}

export const dndHelper = new DndHelper();