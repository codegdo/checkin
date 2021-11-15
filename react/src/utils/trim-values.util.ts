export const trimValues = (values: any): any => {
  Object.keys(values).forEach((key) => {
    if (typeof values[key] === 'object') {
      values[key] = trimValues(values[key]);
    } else if (typeof values[key] === 'string' && key !== 'password') {
      values[key] = values[key].trim();
    }
  });

  return values;
};
