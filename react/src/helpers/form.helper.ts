import { FieldData, FormData } from '../components/form';
import { mapToParent } from '../utils';

type MapField = {
  name: string;
  value: string;
  data: any;
};

export const normalizeForm = (form: FormData): FormData => {
  const { data = [], fields = [] } = JSON.parse(JSON.stringify(form));

  const list: any = [];

  [...data, ...fields].forEach((item) => {
    let { data } = item;

    if (typeof data === 'string') {
      item.data = JSON.parse(data);
    }

    return mapToParent(list, item);
  });

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
