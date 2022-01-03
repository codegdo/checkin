type ObjectField = {
  key: string;
  value: string | number | boolean;
};

type KeysValues = {
  keys: string[];
  values: { [key: string]: string | number | boolean };
};

export function objectToKeyValue({ keys, values }: KeysValues): ObjectField[] {
  if (typeof values === 'object') {
    return Object.entries(values).reduce((a: ObjectField[], i) => {
      if (keys) {
        if (keys.includes(i[0])) {
          return [
            ...a,
            {
              key: i[0],
              value: i[1],
            },
          ];
        }

        return a;
      }

      return [
        ...a,
        {
          key: i[0],
          value: i[1],
        },
      ];
    }, []);
  }
  return [];
}

/*
  input: 
  {
    a: 'text',
    b: 'text'
  }

  output: 
  [
    {
      key: a,
      value: text
    },
    {
      key: b,
      value: text
    }
  ]
*/
