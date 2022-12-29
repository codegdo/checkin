export const getSetStringKeyObject = (values: any, name: string, value?: string) => {
  const names = name.split('.');
  const clone = JSON.parse(JSON.stringify(values));
  const initialValue = { obj: clone, ref: clone, value } as any;

  const result = names.reduce(
    (acc, key, i) => {
      let { obj, ref, value } = acc;
      const lastKey = names.length - 1 == i;
      const length = names.length;

      // assign ref
      if (length > 1) {
        if (i === 0) {
          ref = obj[key];
        } else {
          // insert key if not found
          if (ref && ref[key] === undefined) {
            ref[key] = lastKey ? null : {};
          }
          // skip last key ref
          if (ref) {
            ref = lastKey ? ref : ref[key];
          }
        }
      }

      console.log(ref, key);

      if (ref && ref[key] !== undefined) {
        console.log('VALUE', value);

        if (!value) {
          // get
          value = ref[key];
        } else {
          // set
          ref[key] = value;
        }
      }

      return { ...acc, ref, value };
    },
    { ...initialValue }
  );

  return result;
};
