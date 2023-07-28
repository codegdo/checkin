export type FieldType = {
  text: string;
  number: string;
  password: string;
  email: string;
  date: string;
  datepicker: string;
  checkbox: string;
  radio: string;
  button: string;
  input: string;
  select: string;
  textarea: string;
}

export type ElementType = {
  div: string;
  button: string;
}

export enum GroupType {
  AREA = 'area',
  SECTION = 'section',
  BLOCK = 'block',
  HOLDER = 'holder',
  LIST = 'list',
  ITEM = 'item',
  ELEMENT = 'element',
  FIELD = 'field',
  GROUP = 'group',
  GRID = 'grid',
}

interface ElementField {
  id: number | string;
  name: string;
  type: keyof FieldType | keyof ElementType;
  group?: keyof GroupType;
  data?: (ElementField | FormField)[] | null;
  value?: string | null;
  parentId?: number | string | null;
  position?: number | null;
}

interface FormField extends ElementField {
  label?: string;
  description?: string;
}

export interface NormalizeField extends ElementField, FormField {}

