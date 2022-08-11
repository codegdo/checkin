export const usePagination = () => { };

/*

https://mui.com/material-ui/api/pagination/
https://github.com/mui/material-ui/blob/master/packages/mui-material/src/usePagination/usePagination.js
https://blog.logrocket.com/react-pagination-scratch-hooks/
const boundaryCount = 1;
const siblingCount = 2;
const page = 15;
const count = 20;

const showFirstButton = false;
const showLastButton = true;
const hideNextButton = true;
const hidePrevButton = false;

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const startPages = range(1, Math.min(boundaryCount, count));
const endPages = range(
  Math.max(count - boundaryCount + 1, boundaryCount + 1),
  count
);

const siblingsStart = Math.max(
  Math.min(
    // Natural start
    page - siblingCount,
    // Lower boundary when page is high
    count - boundaryCount - siblingCount * 2 - 1
  ),
  // Greater than startPages
  boundaryCount + 2
);

const siblingsEnd = Math.min(
  Math.max(
    // Natural end
    page + siblingCount,
    // Upper boundary when page is low
    boundaryCount + siblingCount * 2 + 2
  ),
  // Less than endPages
  endPages.length > 0 ? endPages[0] - 2 : count - 1
);

const itemList = [
  ...(showFirstButton ? ['first'] : []),
  ...(hidePrevButton ? [] : ['previous']),
  ...startPages,

  // Start ellipsis
  // eslint-disable-next-line no-nested-ternary
  ...(siblingsStart > boundaryCount + 2
    ? ['start-ellipsis']
    : boundaryCount + 1 < count - boundaryCount
    ? [boundaryCount + 1]
    : []),

  // Sibling pages
  ...range(siblingsStart, siblingsEnd),

  // End ellipsis
  // eslint-disable-next-line no-nested-ternary
  ...(siblingsEnd < count - boundaryCount - 1
    ? ['end-ellipsis']
    : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),

  ...endPages,
  ...(hideNextButton ? [] : ['next']),
  ...(showLastButton ? ['last'] : []),
];

console.log(startPages);
console.log(endPages);
console.log(siblingsStart);
console.log(siblingsEnd);
console.log(itemList);
*/
