export const trimObjectKey = <T>(values, k: string): T => {
  return Object.entries(values).reduce(
    (a: T, i) => {
      const key = i[0].replace(k, '');
      const value = i[1];

      a = { ...a, [key]: value };

      return a;
    },
    {} as T);
}

/* 
  input:
  {
    _a: value
  }

  output:
  {
    a: value
  }
*/