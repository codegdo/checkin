class Paging {
  constructor() { }

  count(limit: number, total: number) {
    return new Array(Math.floor(total / limit)).fill(limit).concat(total % limit).filter(i => i);
  }

  range(start: number, end: number) {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  }
}

export const paging = new Paging();

/*

var count = 10;
var current = 1;
var boundary = 2;
var sibling = 1;

var startEnd = Math.min(boundary, count);
var endStart = Math.max(count - boundary + 1, boundary + 1);

var sibStart = Math.min(current - sibling, count - boundary - (sibling * 2) - 1);
var sibEnd = Math.max(current + sibling, boundary + (sibling * 2) + 2);

var midStart = Math.max(sibStart, boundary + 2);
var midEnd = Math.min(sibEnd, count - boundary - 1);

function range(start, end) {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
}
  
const pageStart = range(1, startEnd);
const pageEnd = range(endStart, count);
const pageMiddle = range(midStart, midEnd);
  
console.log('PAGES', [...pageStart, ...pageEnd]);

console.log(pageStart);
console.log(pageEnd);
console.log(pageMiddle);

console.log(startEnd);
console.log(endStart);
console.log('siblingStart', sibStart);
console.log('siblingEnd', sibEnd);
console.log(midStart);
console.log(midEnd);

*/