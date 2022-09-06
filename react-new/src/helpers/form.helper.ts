import { arrayToObjectKeyGroup, mapToParent } from "../utils";

class FormHelper {
  constructor() { }

  normalize(form: any) {
    const { data = [], fields = [] } = JSON.parse(JSON.stringify(form));

    const list: any[] = [];

    data.forEach((item: any) => {
      return mapToParent(list, item);
    });

    const group: { [key: string]: any[] } = arrayToObjectKeyGroup({ key: 'parentId', values: fields });

    for (const key in group) {

      list.find(item => {

        if (item.id === key) {
          item.data = [...item.data, ...group[key]];
          return;
        }

      });

    }

    //console.log(list);

    return list;
  }

  mapField(data: any) {
    console.log('mapToParent');
    const _data = JSON.parse(JSON.stringify(data));
    const list: any[] = [];

    _data.forEach((item: any, index: number) => {
      item.position = index;
      return mapToParent(list, item);
    });

    return list;
  }

}

export const formHelper = new FormHelper();


