export const arrayToObjectKey = <T>({ key, values }): T => {
  return values.reduce((value, i) => {
    return { ...value, [i[key]]: i }
  }, {} as T);
}

/* 
  input:
  {
    key: 'a',
    values: [
      {
        a: value
      }
    ]
  }

  output:
  {
    a: { 
      a: value
    }
  }
*/