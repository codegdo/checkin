export function filterArrayRange<T>(array: T[], startItem: T, endItem: T): T[] {
    const startIndex = array.indexOf(startItem);
    const endIndex = array.indexOf(endItem);
  
    if (startIndex !== -1 && endIndex !== -1) {
        const filteredArray = array.slice(Math.min(startIndex, endIndex) + 1, Math.max(startIndex, endIndex) + 1);
        return filteredArray;
      } else {
        return [];
      }
  }
  
  /*
  // Example usage:
  const array = [1, 3, '2d', 4, 55, 'abc', '20', 7, 9];
  const startItem = 'abc';
  const endItem = 1;
  
  const filteredArray = filterArrayBetween(array, startItem, endItem);
  console.log(filteredArray); // Output: [1, 3, '2d', 4, 55, 'abc']
  */