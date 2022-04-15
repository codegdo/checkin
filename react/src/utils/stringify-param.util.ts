
export const stringifyParam = (param: string = '', values: any): string => {
  const params = param.split('/');

  return params.reduce((p: string[], i) => {
    return [...p, values[i] || i];
  }, []).join('/');
}