type ObjectKeyParam = {
  key: string;
  values: any[];
};

export const arrayToIdsList = <T>({ key, values }: ObjectKeyParam): T => {
  return values.reduce((value, i) => {
    const { ids = {}, list = [] } = value;
    return {
      ids: { ...ids, [i[key]]: i },
      list: [...list, i[key]]
    }
  }, {} as T);
};