export const splitChunks = (array: any = [], limit = 1): [] => {

  return array.reduce((arr: any, item: any, index: number) => {
    const chunk = Math.floor(index / limit);

    if (!arr[chunk]) {
      arr[chunk] = []
    }

    arr[chunk].push(item);

    return arr;
  }, []);

}