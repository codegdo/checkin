export const linearGradient = (str: string, value: string): string => {
  //"linear-gradient(90deg, rgb(231, 231, 231) 0%, rgb(14, 14, 14) 0%, rgb(14, 14, 14) 0%, rgb(231, 231, 231) 0%)"

  str = str.substring(str.indexOf('(') + 1, str.lastIndexOf(')'));
  //"90deg, rgb(231, 231, 231) 0%, rgb(14, 14, 14) 0%, rgb(14, 14, 14) 0%, rgb(231, 231, 231) 0%"

  const arr: string[] = str.split(
    /,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/
  );

  /*[
    "90deg", 
    "rgb(231, 231, 231) 0%", 
    "rgb(14, 14, 14) 0%", 
    "rgb(14, 14, 14) 0%", 
    "rgb(231, 231, 231) 0%"
  ]*/

  if (arr.length === 5) {
    const v3 = arr[3].substring(0, arr[3].lastIndexOf(' '));
    const v4 = arr[4].substring(0, arr[4].lastIndexOf(' '));
    arr[3] = v3 + value;
    arr[4] = v4 + value;
  }

  return `linear-gradient(${arr.join()})`;
};
