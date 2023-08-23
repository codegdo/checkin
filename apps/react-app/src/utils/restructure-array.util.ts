interface InputItem {
  id: number;
  name: string;
  dataType: string;
  data: any;
  parentId: number | null;
}

interface OutputItem {
  id: number;
  name: string;
  dataType: string;
  data: any;
  parentId: number | null;
}

function restructureArray(inputArray: InputItem[]): OutputItem[] {
  const idToObject: Record<number, OutputItem> = {};

  // First pass: Create objects and organize them by id
  inputArray.forEach(item => {
    const { id, ...rest } = item;
    if (!idToObject[id]) {
      idToObject[id] = { id, ...rest, data: null };
    }
    idToObject[id].data = rest.data;
  });

  // Second pass: Organize objects into a flat structure
  const result: OutputItem[] = [];
  inputArray.forEach(item => {
    const { id } = item;
    if (idToObject[id]) {
      result.push(idToObject[id]);
    }
  });

  return result;
}

// Input data
const inputArray: InputItem[] = [
  {
    id: 1,
    name: 'parent',
    dataType: 'group',
    data: null,
    parentId: null
  },
  {
    id: 2,
    name: 'children',
    dataType: 'field',
    data: null,
    parentId: 1
  },
  {
    id: 3,
    name: 'children',
    dataType: 'field',
    data: null,
    parentId: 1
  },
  {
    id: 4,
    name: 'children',
    dataType: 'field',
    data: [],
    parentId: 10
  },
  {
    id: 5,
    name: 'parent',
    dataType: 'group',
    data: null,
    parentId: null
  },
];

// Call the function and print the result
const output = restructureArray(inputArray);
console.log(output);
