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
  STEP = 'step',
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
}

export interface Field extends Data {
  description?: string;
}

export interface Block extends Data {

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
}
