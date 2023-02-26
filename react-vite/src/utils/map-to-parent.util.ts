type Item = {
  id: string;
  dataType: 'block';
  data: Item[];
  position: number;
  parentId: number | string | null;
};

export function mapToParent(list: Item[], item: Item): boolean {
  if (item.parentId == null) {
    list.push({ ...item });
    return true;
  }

  for (const i of list) {
    if (i.id === item.parentId) {
      i.data?.push({ ...item });
      return true;
    }

    if (i.dataType === 'block' && mapToParent(i.data, { ...item })) {
      return true;
    }
  }

  // console.warn(`Fail mapToParent: ${parentId}`, { id, dataType, data, position, parentId });
  return false;
}

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

/*
type Item = {
  id: string;
  dataType: 'block';
  data: Item[];
  position: number;
  parentId: number | string | null;
};

export function mapToParent(list: Item[], item: Item): void {
  let bool = false;

  if (item.parentId == null) {
    bool = true;
    list.push({ ...item });
    return;
  }

  list.find((i, _index) => {
    if (i.id === item.parentId) {
      bool = false;
      i.data?.push({ ...item });
      return;
    }

    if (i.dataType === 'block') {
      bool = true;
      mapToParent(i.data, item);
    }
  });

  if (bool) {
    // console.warn(`Fail mapToParent: ${item.parentId}`, item);
  }
}
*/
/*
  input:
  {
    blocks: [
      {
        id: 1,
        role: 'block',
        data: [],
        position: 0,
        parentId: null
      }
    ],
    fields: [
      {
        role: 'field',
        position: 0,
        parentId: 1
      }
    ]
  }

  output:
  {
    blocks: [
      {
        id: 1,
        role: 'block',
        data: [
          //
          {
            role: 'field',
            position: 2,
            parentId: 1
          }
          //
        ],
        position: 0,
        parentId: null
      }
    ],
    fields: [
      {
        role: 'field',
        position: 1,
        parentId: 1
      }
    ]
  }
*/
