import { FieldData, FormData } from '../components';


type MapField = {
  key: string;
  value: string;
  data: any;
};

type ReturnFormData = FormData;

export const normalizeForm = (form: FormData): ReturnFormData => {
  const { data = [], fields = [] } = JSON.parse(JSON.stringify(form));

  const list: FieldData[] = [];

  data.forEach((item: FieldData) => {
    return mapFieldToParent(list, item);
  });

  const group: { [key: string]: FieldData[] } = mapFieldToGroup({ key: 'parentId', values: fields });

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

export const mapDataToFields = (
  fields: FieldData[],
  { key, value, data }: MapField
): void => {
  fields.filter((field) => {
    if (field.name === key) {
      field.value = value;
      field.data = [...data];
    }
  });
};

export const mapFieldToGroup = ({ key, values }: { key: keyof FieldData, values: FieldData[] }) => {
  return values.reduce((value, i) => {
    const name: string = i[key];
    const group: FieldData[] = value[name] || [];

    return { ...value, [name]: [...group, i] };

  }, {} as { [key: string]: FieldData[] });
};

export function mapFieldToParent(list: FieldData[] = [], item: FieldData): void {

  let bool = false;

  if (item.parentId === null) {
    bool = true;
    list.push({ ...item });
    return;
  }

  list.find((i, _index) => {

    if (i.id === item.parentId) {
      bool = false;

      if (i.data) {
        i.data.push({ ...item });
      }

      return;
    }

    if (i.role === 'block') {
      bool = true;
      mapFieldToParent(i.data as FieldData[], item);
    }
  });

  if (bool) {
    // console.warn(`Fail mapToParent: ${item.parentId}`, item);
  }
}



/*
  input:
  {
    blocks: [
      {
        id: 1,
        role: 'block',
        data: [],
        position: 0,
        parentId: null
      }
    ],
    fields: [
      {
        role: 'field',
        position: 0,
        parentId: 1
      }
    ]
  }

  output:
  {
    blocks: [
      {
        id: 1,
        role: 'block',
        data: [
          //
          {
            role: 'field',
            position: 2,
            parentId: 1
          }
          //
        ],
        position: 0,
        parentId: null
      }
    ],
    fields: [
      {
        role: 'field',
        position: 1,
        parentId: 1
      }
    ]
  }
*/
