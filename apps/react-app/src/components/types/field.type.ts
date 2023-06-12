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

interface SharedField {
  id: number | string;
  name: string;
  type: string | ElementType | FieldType;
  dataType: string | DataType;
}

interface FormField extends SharedField {
  label?: string;
}

type HtmlField = SharedField;

export type Field = FormField & HtmlField & {
  data?: (FormField | HtmlField)[];
};

export interface DragField {
  id?: string | number;
  type: FieldType | ElementType;
  dataType: DataType;
}
