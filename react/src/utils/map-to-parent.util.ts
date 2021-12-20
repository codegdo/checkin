interface Item {
  role: 'block';
  data: any[];
  position: number;
  positionParent: number;
}

export function mapToParent(list: Item[], item: Item): void {
  let bool = false;

  if (item.positionParent === null) {
    bool = true;
    list.push({ ...item });
    return;
  }

  list.find((i) => {
    if (i.position === item.positionParent) {
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
    // console.warn(`Fail mapToParent: ${block.mapToParent}`, block);
  }
}

/*
  input:
  {
    blocks: [
      {
        role: 'block',
        data: [],
        position: 1
      }
    ],
    fields: [
      {
        role: 'field',
        position: 0,
        positionParent: 1
      }
    ]
  }

  output:
  {
    blocks: [
      {
        role: 'block',
        data: [
          //
          {
            role: 'field',
            position: 2,
            positionParent: 1
          }
          //
        ],
        position: 1,
        positionParent: null
      }
    ],
    fields: [
      {
        role: 'field',
        position: 2,
        positionParent: 1
      }
    ]
  }
*/
