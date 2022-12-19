export const getSetStringKeyObject = (values: any, name: string, value?: string) => {
  const keys = name.split('.');
  const clone = JSON.parse(JSON.stringify(values));
  const initialValue = { obj: clone, ref: clone, value } as any;

  const result = keys.reduce(
    (acc, k, i) => {
      let { obj, ref, value } = acc;
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

      console.log(ref, k);

      if (ref && ref[k] !== undefined) {
        console.log('VALUE', value);

        if (!value) {
          // get
          value = ref[k];
        } else {
          // set
          ref[k] = value;
        }
      }

      return { ...acc, ref, value };
    },
    { ...initialValue } as any
  );

  return result;
};
