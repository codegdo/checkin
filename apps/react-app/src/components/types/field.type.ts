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

export enum ElementType {
  DIV = 'div',
}

export enum DataType {
  AREA = 'area',
  SECTION = 'section',
  BLOCK = 'block',
  PLACEHOLDER = 'placeholder',
  ELEMENT = 'element',
  FIELD = 'field',
  GROUP = 'group',
  GRID = 'grid',
}

interface ElementField {
  id: number | string;
  name: string;
  type: string | ElementType | FieldType;
  dataType: string | DataType;
}

interface FormField extends ElementField {
  label?: string;
  description?: string;
}

export type Field = ElementField & FormField & {
  data?: (ElementField | FormField)[];
};

export interface DragField {
  id?: string | number;
  type: FieldType | ElementType;
  dataType: DataType;
}
