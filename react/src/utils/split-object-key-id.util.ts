import { splitStringKeyId } from './split-string-key-id.util';

type ObjectKeyId = {
  keys: { [key: string]: string };
  ids: { [key: string]: string };
};

export function splitObjectKeyId(values: { [key: string]: string }): ObjectKeyId {
  return Object.entries(values).reduce(
    (a, i) => {
      const { key, id } = splitStringKeyId(i[0]);
      const value = i[1];

      a.keys = { ...a.keys, [key]: value };
      a.ids = { ...a.ids, [id]: value };

      return a;
    },
    { keys: {}, ids: {} }
  );
}

/*
 input:
 {
   a1: value,
   b2: value
 }

 output:
 {
    keys: {
      a: value,
      b: value
    },
    ids: {
      1: value,
      2: value
    }
  }
*/
