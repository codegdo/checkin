type GroupedObject<T> = Record<string, T>;

function reduceArray<T>(array: T[], sortingKey: keyof T): GroupedObject<Omit<T, 'rowIndex'>>[] {
  const groupedObject: GroupedObject<T>[] = [];

  // Sort the input array based on the specified sorting key
  const sortedArray = array.sort((a, b) => {
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
      const newItem = { [groupingKey]: item[sortingKey], [item.key]: item.value } as { [x: string]: string | number | null };
      groupedObject.push(newItem);
    } else {
      groupedObject[index][item.key] = item.value;
    }
  });

  // Remove rowIndex from the resulting objects
  return groupedObject.map((group) => {
    const { rowIndex, ...groupWithoutRowIndex } = group;
    return groupWithoutRowIndex as GroupedObject<Omit<T, 'rowIndex'>>;
  });
}

// Example usage:
interface SampleItem {
  key: number | string;
  value: string;
  rowIndex: number;
}

const inputArray = [
  { key: 6, value: '123', rowIndex: 0 },
  { key: 7, value: 'Admin', rowIndex: 0 },
  { key: 6, value: '123', rowIndex: 1 },
  { key: 7, value: 'Admin', rowIndex: 1 },
];

const reducedArray = reduceArray<Record<string, string | number>[]>(inputArray, 'rowIndex');
console.log(reducedArray);
