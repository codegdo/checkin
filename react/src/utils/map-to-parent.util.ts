interface Item {
  id: string;
  role: 'block';
  data: any[];
  position: number;
  parentId: string;
}

export function mapToParent(list: Item[], item: Item): void {

  let bool = false;

  if (item.parentId === null) {
    bool = true;
    list.push({ ...item });
    return;
  }

  list.find((i, _index) => {

    if (i.id === item.parentId) {
      bool = false;
      i.data.push({ ...item });
      return;
    }

    if (i.role === 'block') {
      bool = true;
      mapToParent(i.data, item);
    }
  });

  if (bool) {
    // console.warn(`Fail mapToParent: ${item.parentId}`, item);
  }
}



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
