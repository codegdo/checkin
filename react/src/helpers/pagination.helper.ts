export const pageCount = (limit: number, total: number) => {
  return new Array(Math.floor(total / limit)).fill(limit).concat(total % limit).filter(i => i);
}

export const pageRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};