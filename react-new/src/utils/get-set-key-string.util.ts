export const getSetStringKeyObject = (obj: any, key: string, value?: string) => {
  const keys = key.split('.');

  console.log('OOOOO', obj);

  const result = keys.reduce(
    (a, k, i) => {
      let { obj, ref, value } = a;

      // nested
      if (keys.length > 1) {

        if (obj[k] && typeof obj[k] === 'object') {

          ref = obj[k];

        } else {

          if (keys.length - 1 == i) {
            //ref[k] = value || ref[k];
            ref[k] = ref[k] || null;
          } else {
            ref[k] = ref[k] || {};
          }

          ref = ref[k];

        }

        if (ref && ref[k]) {
          if (!value) {
            // get
            value = ref[k];
          } else {
            // set
            ref[k] = value;
          }
        }

      } else {
        if (!value) {
          // get
          value = obj[k];
        } else {
          // set
          obj[k] = value;
        }
      }

      return { ...a, ref, value };
    },
    { obj, ref: null, value } as any
  );

  console.log(result);
  return result;
};
