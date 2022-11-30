export const getSetStringKeyObject = (obj: any, key: string, value?: string) => {
  const keys = key.split('.');

  const result = keys.reduce(
    (a, k, i) => {
      let { obj, ref, value } = a;
      const lastKey = keys.length - 1 == i;
      const length = keys.length;

      // assign ref
      if (length > 1) {
        if (i === 0) {
          ref = obj[k];
        } else {
          // insert key if not found
          if (ref && ref[k] === undefined) {
            ref[k] = lastKey ? null : {};
          }
          // skip last key ref
          if (ref) {
            ref = lastKey ? ref : ref[k];
          }
        }
      }

      if (ref && ref[k] !== undefined) {
        if (!value) {
          // get
          value = ref[k];
        } else {
          // set
          ref[k] = value;
        }
      }

      return { ...a, ref, value };
    },
    { obj, ref: obj, value } as any
  );

  return result;
};
