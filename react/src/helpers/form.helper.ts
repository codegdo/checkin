import { FormData } from '../components/form';
import { mapToParent } from '../utils';

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
