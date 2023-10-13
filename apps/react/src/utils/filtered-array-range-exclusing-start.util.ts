export function filterArrayRangeExclusingStart<T>(array: T[], startItem: T, endItem: T): T[] {
  const startIndex = array.indexOf(startItem);
  const endIndex = array.indexOf(endItem);
  
  if (startIndex !== -1 && endIndex !== -1) {
    if (startIndex < endIndex) {
      //return array.slice(startIndex + 1, endIndex);
      return array.slice(startIndex + 1, endIndex + 1);
    } else if (startIndex > endIndex) {
      //return array.slice(endIndex + 1, startIndex);
      return array.slice(endIndex, startIndex).reverse();
    }
  }

  return [];
}

/*
// Example usage:
const array = [1, 3, '2d', 4, 55, 'abc', '20', 7, 9];
const startItem = 'abc';
const endItem = 1;

const filteredArray = filterArrayBetween(array, startItem, endItem);
console.log(filteredArray); // Output: [1, 3, '2d', 4, 55]
*/