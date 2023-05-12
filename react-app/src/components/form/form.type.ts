export enum ElementType {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
  EMAIL = 'email',
  DATE = 'date',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  DIV = 'div',
  BUTTON = 'button',
}

export enum DataType {
  AREA = 'area',
  SECTION = 'section',
  PLACEHOLDER = 'placeholder',
  BLOCK = 'block',
  ELEMENT = 'element',
  FIELD = 'field',
  GROUP = 'group',
  GRID = 'grid',
}

export type Element = Block | Field;

interface Data {
  id?: number | string;
  name: string;
  label?: string;
  type: ElementType | string;
  dataType: DataType | string;
  data?: Element[];
  className?: string;
  value?: string;
  position?: number;
  parentId?: string | null;
  childId?: string | null;
  settings?: Record<string, any>;
  isActive?: boolean;
  [key: string]: any;
}

export interface Field extends Data {
  description?: string;
}

export interface Block extends Data {

}

export interface FormOptions {
  mapKey?: string;
  isMultiSteps?: boolean;
  animation?: 'slide';
}

export interface FormData {
  id: number | string;
  name: string;
  label?: string;
  description?: string;
  className?: string;
  data: Element[];
  fields: Field[];
  steps: string[];
  options?:FormOptions
}
