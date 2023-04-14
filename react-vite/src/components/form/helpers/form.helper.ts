import UtilHelper, { util } from "../../../helpers/util.helper";
import { Element, FormData, DataType } from '../form.type';

class FormHelper {
  static normalizeFormData(formData: FormData) {
    throw new Error('Method not implemented.');
  }
  private util: UtilHelper;

  constructor(util: UtilHelper) {
    this.util = util;
  }

  normalizeFormData(form: FormData) {
    const { data = [], fields = [] } = this.util.cloneDeep(form);

    const list: Element[] = [];

    const group: Record<string, Element[]> = this.util.groupBy(
      fields,
      (item) => item?.parentId as string
    );

    for (const key in group) {
      const item = data.find((item: Element) => `${item.id}` === key);
      if (item) {
        item.data = item.data ?? [];
        item.data.push(...group[key]);
      }
    }

    data.forEach((item: Element) => {
      return this.util.mapToParent(
        list,
        item,
        (item) => (item.dataType === DataType.SECTION || item.dataType === DataType.BLOCK)
      );
    });

    console.log(list);

    return list;
  }

  mapField(data: any) {
    const _data = JSON.parse(JSON.stringify(data));
    const list: Element[] = [];

    _data.forEach((item: Element, index: number) => {
      item.position = index;
      return this.mapToParent(list, item);
    });

    return list;
  }

  // mapToSection(section) {
  //   const sectionId = section.id;
  //   const fields = [];

  //   section.data.forEach(item => {
  //     if (item.type === 'field') {
  //       fields.push(item);
  //     } else if (item.type === 'block') {
  //       fields.push(...extractFields(item));
  //     }
  //   });

  //   outputObject[sectionId] = fields;
  //   return fields;
  // }

  mapToParent(list: Element[], item: Element): boolean {
    if (item.parentId == null) {
      list.push({ ...item });
      return true;
    }

    for (const i of list) {
      if (i.id === item.parentId) {
        i.data?.push({ ...item } as any);
        return true;
      }

      if (
        (i.dataType === 'section' || i.dataType === 'block') &&
        this.mapToParent(i.data as Element[], { ...item })
      ) {
        return true;
      }
    }

    // console.warn(`Fail mapToParent: ${parentId}`, { id, dataType, data, position, parentId });
    return false;
  }

}

export const formHelper = new FormHelper(util);
export default FormHelper;

/*
type Item = {
  id: string;
  dataType: 'block';
  data: Item[];
  position: number;
  parentId: number | string;
}

class FormHelper {
  normalize(form: any) {
    const { data = [], fields = [] } = _.cloneDeep(form);

    const list = data.map((item: any) => {
      const newItem = { ...item };
      mapToParent(list, newItem);
      return newItem;
    });

    const group: { [key: string]: any[] } = _.groupBy(fields, 'parentId');

    for (const key in group) {
      const index = list.findIndex(item => item.id === key);
      if (index !== -1) {
        list[index].data.push(...group[key]);
      }
    }

    //console.log(list);

    return list;
  }

  mapField(data: any) {
    const _data = _.cloneDeep(data);
    const list: Item[] = [];

    _data.forEach((item: Item, index: number) => {
      item.position = index;
      const newItem = { ...item };
      mapToParent(list, newItem);
      list.push(newItem);
    });

    return list;
  }
}

*/
