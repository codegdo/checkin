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

  checkErrorInArray(array: string[], error: Record<string, string>) {
    return array.some(value => error.hasOwnProperty(value));
  }

  findSectionIndexByKey(sections: (Record<string, string[]> | string)[], key: string): number {
    for (let i = 0; i < sections.length; i++) {
      if (typeof sections[i] === "string" && sections[i] === key) {
        return i;
      } else if (typeof sections[i] === "object" && sections[i] !== null) {
        const keys = Object.keys(sections[i]);
        if (keys.includes(key)) {
          return i;
        }
      }
    }
    return -1;
  }

  // extractFields(data: Element[] = [], mapKey:string) {
  //   const fields: string[] = [];

  //   data.forEach(field => {
  //     if (field.dataType === 'field') {
  //       const keyId = field[`${mapKey}`]; 
  //       fields.push(keyId);
  //     } else if (field.dataType === 'block') {
  //       fields.push(...this.extractFields(field.data, mapKey));
  //     }
  //   });

  //   return fields;
  // }

  extractFields(data: Element[] = [], mapKey: string): string[] {
    return data.flatMap((field) => {
      if (field.dataType === "field") {
        const keyId = field[mapKey];
        return [keyId];
      } else if (field.dataType === "block") {
        return this.extractFields(field.data, mapKey);
      } else {
        return [];
      }
    });
  }

  mapFieldToSection(data: Element[] = [], mapKey: string) {
    const filteredSections = data.filter((item) => item.dataType === "section");
    return filteredSections.map((section) => {
      const sectionId = section.id;
      const sectionFields = this.extractFields(section.data, mapKey);
      return { [`${sectionId}`]: sectionFields };
    });
  }

  // mapFieldToSection(data: Element[] = [], mapKey:string) {
  //   const filteredSections = data.filter(item => item.dataType === 'section');
  //   const result: Record<string, string[]> = {};
    
  //   filteredSections.forEach(section => {
  //     const sectionId = section.id;
  //     const sectionFields = this.extractFields(section?.data, mapKey);
  //     result[`${sectionId}`] = sectionFields;
  //   });

  //   return result;
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
