export const debounce = (cb, delay = 1000) => {
  let timeout = null;
  console.log('TTTTT');
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log('TTTTT');
      cb(...args);
    }, delay);
  };
};