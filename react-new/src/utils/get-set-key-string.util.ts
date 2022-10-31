export const getSetStringKeyObject = (obj: any, key: string, value?: string) => {
  const keys = key.split('.');

  return keys.reduce(
    (a, k) => {
      let { obj, ref, value } = a;

      //nested
      if (ref && ref[k]) {
        if (!value) {
          // get
          value = ref[k];
        } else {
          // set
          ref[k] = value;
        }
      }

      // not nested
      if (keys.length === 1) {
        if (!value) {
          // get
          value = obj[k];
        } else {
          // set
          obj[k] = value;
        }
      }

      return { ...a, ref: obj[k], value };
    },
    { obj, ref: null, value } as any
  );
};
