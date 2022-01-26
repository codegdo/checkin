import { FieldData, FormData } from '../components/form';
import { arrayToObjectKeyGroup, mapToParent } from '../utils';

type MapField = {
  name: string;
  value: string;
  data: any;
};

export const normalizeForm = (form: FormData): FormData => {
  const { data = [], fields = [] } = JSON.parse(JSON.stringify(form));

  const list: any[] = [];

  data.forEach((item: any) => {
    return mapToParent(list, item);
  });

  const group: { [key: string]: FieldData[] } = arrayToObjectKeyGroup({ key: 'parentId', values: fields });

  for (const key in group) {

    list.find(item => {

      if (item.id === key) {
        item.data = [...item.data, ...group[key]];
        return;
      }

    });

  }

  console.log(list);

  return { ...form, data: list };
};

export const mapDataToField = (
  fields: FieldData[],
  { name, value, data }: MapField
): void => {
  fields.filter((field) => {
    if (field.name === name) {
      field.value = value;
      field.data = [...data];
    }
  });
};
