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
  BUTTON = 'button',
}

export enum BlockType {
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

interface BaseEntity {
  id?: number | string | null;
  name: string;
  type: FieldType | ElementType | string;
  blockType: BlockType | string;
  value?: string | null;
}

export interface IControl extends BaseEntity {
  data?: IControl[] | null;
}

export interface IElement extends BaseEntity {
  data?: (IElement | IField)[] | null;
  parentId?: number | string | null;
  postion?: number | null;
}

export interface IField extends BaseEntity {
  data?: IField[] | null;
  parentId?: number | string;
  postion?: number | null;
}

export type ComponentField = IControl & IElement & IField;