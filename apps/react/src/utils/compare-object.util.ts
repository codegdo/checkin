type NestedObject = { [key: string]: any };

export function compareObject(oldObj: NestedObject, newObj: NestedObject): string[] {
  const keys = Object.keys(oldObj);

  const changedValues = keys.filter(key => {
    const oldValue = oldObj[key];
    const newValue = newObj[key];

    if (typeof oldValue === 'object' && typeof newValue === 'object') {
      return compareObject(oldValue, newValue).length > 0;
    }

    return oldValue !== newValue;
  });

  return changedValues;
}