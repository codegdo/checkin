import { mapToParent } from "@/utils";
import { FormFieldType } from "../types";

class FormHelper {
  groupData(data: FormFieldType[]) {
    const cloneData = structuredClone(data);
    const list: FormFieldType[] = [];

    const condition = (item: FormFieldType) => ['area', 'section', 'block', 'list'].includes(item.blockType);

    cloneData.forEach((item: FormFieldType) => {
      return mapToParent(list, item, condition);
    });

    return list;
  }
}

export const formHelper = new FormHelper();