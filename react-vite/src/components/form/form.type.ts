export enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
  EMAIL = 'email',
  DATE = 'date',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
}

export enum BlockType {
  DIV = 'div',
  BUTTON = 'button',
}

export enum DataType {
  BLOCK = 'block',
  ELEMENT = 'element',
  FIELD = 'field',
  GROUP = 'group',
  GRID = 'grid',
}

export interface Data {
  id: number;
  name: string;
  label?: string;
  description?: string;
  className?: string;
}

export interface FieldData extends Data {
  type: BlockType | FieldType | string;
  dataType: DataType;
  data: unknown[];
  position?: number;
  parentId?: number | string;
}

export interface BlockData extends Data {
  type: BlockType | FieldType | string;
  dataType: DataType;
  data: BlockData[] | FieldData[];
  position?: number;
  parentId?: number | string;
}

export interface FormData extends Data {
  data: BlockData[] | FieldData[];
  fields: FieldData[];
}
