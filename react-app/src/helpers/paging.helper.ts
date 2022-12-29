class PagingHelper {
  constructor() { }

  chunk(list: any[] = [], limit: number = 1): any[] {
    // list = [1, 2, 3, 4, 5]
    // limit = 2
    // output = [[1, 2], [3, 4], [5]]
    return list.reduce((acc, item, index) => {
      const chunk = Math.floor(index / limit);

      if (!acc[chunk]) {
        acc[chunk] = []
      }

      acc[chunk].push(item);

      return acc;
    }, []);
  }

  count(total: number, limit: number): number[] {
    // total = [1, 2, 3, 4, 5].length
    // limit = 2
    // output = [2, 2, 1]
    return new Array(Math.floor(total / limit)).fill(limit).concat(total % limit).filter(i => i);
  }

  range(start: number, end: number) {
    // start = 2
    // end = 5
    // output = [2, 3, 4, 5]
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  }

  get(option: { count?: number, current?: number, boundary?: number, sibling?: number } = {}) {
    const { count = 0, current = 1, boundary = 1, sibling = 1 } = option;
    const startEnd = Math.min(boundary, count);
    const endStart = Math.max(count - boundary + 1, boundary + 1);

    const startSibling = Math.min(current - sibling, count - boundary - (sibling * 2) - 1);
    const endSibling = Math.max(current + sibling, boundary + (sibling * 2) + 2);

    const startMiddle = Math.max(startSibling, boundary + 2);
    const endMiddle = Math.min(endSibling, count - boundary - 1);

    const startBoundary = boundary + 1 < count - boundary ? [boundary + 1] : [];
    const endBoundary = count - boundary > boundary ? [count - boundary] : [];

    const startEllipsis = (startSibling > boundary + 2) ? ['start-ellipsis'] : [...startBoundary];
    const endEllipsis = (endSibling < count - boundary - 1) ? ['end-ellipsis'] : [...endBoundary];

    const startPage = this.range(1, startEnd);
    const endPage = this.range(endStart, count);
    const middlePage = this.range(startMiddle, endMiddle);

    return [...startPage, ...startEllipsis, ...middlePage, ...endEllipsis, ...endPage];
  }
}

export const pagingHelper = new PagingHelper();

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