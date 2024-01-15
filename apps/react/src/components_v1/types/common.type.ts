export enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
  EMAIL = 'email',
  DATE = 'date',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  SELECT = 'select',
  TEXTAREA = 'textarea'
}

export enum ElementType {
  BUTTON = 'button',
  LINK = 'link',
  PARAGRAPH = 'paragraph',
  IMAGE = 'image',

}

export enum DataType {
  AREA = 'area',
  SECTION = 'section',
  BLOCK = 'block',
  HOLDER = 'holder',

  LIST = 'list',
  ITEM = 'item',

  //ELEMENT = 'element',
  BUTTON = 'button',
  LINK = 'link',
  PARAGRAPH = 'paragraph',
  IMAGE = 'image',

  //FIELD = 'field',
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
  EMAIL = 'email',
  DATE = 'date',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  SELECT = 'select',
  TEXTAREA = 'textarea',

  GROUP = 'group',
  GRID = 'grid',
}

interface BaseEntity {
  id?: number | string | null;
  name: string;
  type: DataType | string;
  //dataType: DataType | string;
  value?: string | null;
}

export interface IControl extends BaseEntity {
  data?: IControl[] | null;
}

export interface IElement extends BaseEntity {
  data?: (IElement | IField)[] | null;
  parentId?: number | string | null;
  position?: number | null;
}

export interface IField extends IElement {
  title?: string | null;
  description?: string | null;
}

export type ComponentField = IControl & IElement & IField;