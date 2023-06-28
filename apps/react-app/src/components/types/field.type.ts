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
  COLUMN = 'column',
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

export type ExtendedField = Field & {
  selected?: boolean;
}

export type DragField = Partial<Field>