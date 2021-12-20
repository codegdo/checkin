export const flattenObject = (obj: any): { [key: string]: string } => {
  return Object.keys(obj).reduce((a, k) => {
    return { ...a, ...obj[k] };
  }, {});
};

/*
  input:  
  {
    a: {
      aa: value
    },
    b: {
      bb: value
    }
  }

  output:
  {
    aa: value,
    bb: value
  }
*/
