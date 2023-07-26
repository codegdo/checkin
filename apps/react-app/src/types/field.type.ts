export enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
  EMAIL = 'email',
  DATE = 'date',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  BUTTON = 'button',
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
  type: JSX.ElementType | FieldType;
  group: string | GroupType;

  data?: (ElementField | FormField)[] | null;
  value?: string | null;
  parentId?: number | string | null;
  position?: number | null;
}

interface FormField extends ElementField {
  label?: string;
  description?: string;
}

export type Field = ElementField | FormField;
