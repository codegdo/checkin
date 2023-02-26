import { BlockData, FieldData, FormData } from '../components/form';
import { arrayToObjectKeyGroup, mapToParent } from '../utils';
import UtilHelper, { util } from './util.helper';

type Item = BlockData | FieldData;

class FormHelper {
  private util: UtilHelper;

  constructor(util: UtilHelper) {
    this.util = util;
  }

  normalize(form: FormData) {
    const { data = [], fields = [] } = this.util.cloneDeep(form);

    const list: Item[] = [];

    const group: { [key: string]: Item[] } = this.util.groupBy(
      fields,
      (item) => item?.parentId as string
    );

    for (const key in group) {
      const item = data.find((item: Item) => `${item.id}` === key);
      if (item) {
        item.data = [...item.data, ...group[key]];
      }
    }

    data.forEach((item: Item) => {
      return this.mapToParent(list, item);
    });

    //console.log(list);

    return list;
  }

  mapField(data: any) {
    const _data = JSON.parse(JSON.stringify(data));
    const list: Item[] = [];

    _data.forEach((item: Item, index: number) => {
      item.position = index;
      return this.mapToParent(list, item);
    });

    return list;
  }

  mapToParent(list: Item[], item: Item): boolean {
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
        i.dataType === 'block' &&
        this.mapToParent(i.data as Item[], { ...item })
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
