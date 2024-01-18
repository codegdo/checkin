type GroupedObject = Record<string, string | number | null>;

export function sortAndGroupByObject<T extends GroupedObject>(inputArray: T[] = [], sortingKey: keyof T) {
  const groupedObject: GroupedObject[] = [];

  // Sort the input array based on the specified sorting key
  const sortedArray = inputArray.sort((a, b) => {
    const keyA = a[sortingKey] as number | string;
    const keyB = b[sortingKey] as number | string;

    if (typeof keyA === 'number' && typeof keyB === 'number') {
      return keyA - keyB;
    } else {
      // If either key is not a number, use string comparison
      return String(keyA).localeCompare(String(keyB));
    }
  });

  sortedArray.forEach((item) => {
    const groupingKey = sortingKey === 'rowIndex' ? 'rowIndex' : String(item[sortingKey]);

    if (!groupingKey) {
      return;
    }

    const index = groupedObject.findIndex((group) => group[groupingKey] === item[sortingKey]);

    if (index === -1) {
      const newItem = { [groupingKey]: item[sortingKey], [item.id as string]: item.value };
      groupedObject.push(newItem);
    } else {
      groupedObject[index][item.id as string] = item.value;
    }
  });

  // Remove rowIndex from the resulting objects
  return groupedObject.map((group) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { rowIndex, ...groupWithoutRowIndex } = group;
    return groupWithoutRowIndex;
  });
}

/*
const inputArray = [
  { id: 6, value: '123', rowIndex: 0 },
  { id: 7, value: 'Admin', rowIndex: 0 },
  { id: 6, value: '124', rowIndex: 1 },
  { id: 7, value: 'User', rowIndex: 1 },
];

const reducedArray = reduceArray(inputArray, 'rowIndex');
console.log(reducedArray);

[LOG]: [{
  "6": "123",
  "7": "Admin"
}, {
  "6": "124",
  "7": "User"
}] 
*/