interface Item {
  role: 'block';
  data: any[];
  index: number;
  indexParent: number;
}

export function mapToParent(list: Item[], item: Item): void {
  let bool = false;

  if (item.indexParent === null) {
    bool = true;
    list.push({ ...item });
    return;
  }

  list.find((i) => {
    if (i.index === item.indexParent) {
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
