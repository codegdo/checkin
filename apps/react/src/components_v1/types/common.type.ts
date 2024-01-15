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

interface Base {
  id?: number | string | null;
  name: string;
  type: DataType | string;
  value?: string | null;
}

export interface IControl extends Base {
  data?: IControl[] | null;
}

export interface IField extends Base {
  title?: string | null;
  description?: string | null;
  hint?: string | null;

  data?: IField[] | null;
  parentId?: number | string | null;
  position?: number | null;

  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
}

export type FieldType = IControl & IField;