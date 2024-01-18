export function sortAndGroupByArray<T>(inputArray: T[], groupingKey: keyof T): T[][] {
  // Sort the array based on the grouping key
  const sortedArray = inputArray.sort((a, b) => {
    const keyA = a[groupingKey];
    const keyB = b[groupingKey];

    if (typeof keyA === 'number' && typeof keyB === 'number') {
      return keyA - keyB;
    } else {
      // If either key is not a number, use string comparison
      return String(keyA).localeCompare(String(keyB));
    }
  });

  // Group the sorted array by the grouping key
  const groupedArray: T[][] = [];
  let currentGroup: T[] = [];

  sortedArray.forEach((item, index) => {
    if (index === 0 || item[groupingKey] === sortedArray[index - 1][groupingKey]) {
      currentGroup.push(item);
    } else {
      groupedArray.push([...currentGroup]);
      currentGroup = [item];
    }
  });

  if (currentGroup.length > 0) {
    groupedArray.push([...currentGroup]);
  }

  return groupedArray;
}

/* // Example usage:
interface SampleItem {
  id: number | string;
  value: string;
  rowIndex: number;
}

const sampleArray: SampleItem[] = [
  { id: 6, value: '123', rowIndex: 0 },
  { id: 7, value: 'Admin', rowIndex: 0 },
  { id: 6, value: '123', rowIndex: 1 },
  { id: 7, value: 'Admin', rowIndex: 1 },
];

const sortedAndGroupedResult = sortAndGroupByKey(sampleArray, 'rowIndex');
console.log(sortedAndGroupedResult); */
