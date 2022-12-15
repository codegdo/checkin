import { arrayToObjectKeyGroup, mapToParent } from "../utils";

type Item = {
  id: string;
  dataType: 'block';
  data: Item[];
  position: number;
  parentId: number | string;
}

class FormHelper {
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
    const _data = JSON.parse(JSON.stringify(data));
    const list: Item[] = [];

    _data.forEach((item: Item, index: number) => {
      item.position = index;
      return mapToParent(list, item);
    });

    return list;
  }

}

export const formHelper = new FormHelper();


