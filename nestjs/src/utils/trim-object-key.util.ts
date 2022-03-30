export const trimObjectKey = <T>(values): T => {
  return Object.entries(values).reduce(
    (a: T, i) => {
      const key = i[0].split('_')[1];
      const value = i[1];

      a = { ...a, [key]: value };

      return a;
    },
    {} as T);
}

/* 
  input:
  {
    out_a: value
  }

  output:
  {
    a: value
  }
*/