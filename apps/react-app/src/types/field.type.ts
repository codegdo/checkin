export enum ComponentType {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
  EMAIL = 'email',
  DATE = 'date',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  BUTTON = 'button',
  SELECT = 'select',
  INPUT = 'input',
  DATE_PICKER = 'date-picker',
  TOAST = 'toast',
  MODAL = 'modal',
  TABS = 'tabs',
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

  type: JSX.ElementType | ComponentType;
  group?: string | GroupType;

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
