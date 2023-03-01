export enum ElementType {
  Text = 'text',
  Number = 'number',
  Password = 'password',
  Email = 'email',
  Date = 'date',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Div = 'div',
  Button = 'button',
}

export enum DataType {
  Area = 'area',
  Placeholder = 'placeholder',
  Block = 'block',
  Element = 'element',
  Field = 'field',
  Group = 'group',
  Grid = 'grid',
}

export type Element = Block | Field;

interface Data {
  id?: number | string;
  name: string;
  label?: string;
  type: ElementType | string;
  dataType: DataType;
  data?: Element[];
  className?: string;
  value?: string;
  position?: number;
  parentId?: number | string;
}

export interface Field extends Data {
  description?: string;
}

export interface Block extends Data {
  placeholderId?: number | string;
}

export interface FormData {
  id: number | string;
  name: string;
  label?: string;
  description?: string;
  className?: string;
  data: Element[];
  fields: Field[];
  formFields: Field[];
}
