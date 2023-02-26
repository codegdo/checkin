type ObjectKeyParam = {
  key: string;
  values: any[];
};

export const arrayToObjectKey = <T>({ key, values }: ObjectKeyParam): T => {
  return values.reduce((value, i) => {
    return { ...value, [i[key]]: i };
  }, {} as T);
};

export const arrayToObjectKeyGroup = <T>({ key, values }: ObjectKeyParam): T => {
  return values.reduce((value, i) => {
    const group = value[i[key]] || [];
    return { ...value, [i[key]]: [...group, i] };
  }, {} as T);
};

/* arrayToObjectKey
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
    value: { 
      a: value
    }
  }
*/

/* arrayToObjectKeyGroup
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
    value: [
      { 
        a: value
      }
    ]
  }
*/
