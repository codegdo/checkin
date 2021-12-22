export const trimUnderscoreObjectKey = <T>(values): T => {
  return Object.entries(values).reduce(
    (a: T, i) => {
      const key = i[0].substring(1);
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