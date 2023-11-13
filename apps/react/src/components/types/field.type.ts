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
  HOLDER = 'holder',
  LIST = 'list',
  ITEM = 'item',
  ELEMENT = 'element',
  FIELD = 'field',
  GROUP = 'group',
  GRID = 'grid',
}

export interface FieldCondition {
  id: string | number;
  fieldId: string | number;
  caseSensitivity: boolean;
  comparison: 'equals' | 'contains' | 'startsWith' | 'endsWith';
  operator: 'and' | 'or';
  value: string;
}

export interface FieldAccessibility {
  id: string | number;
  title: string;
  description?: string;
  conditions: FieldCondition[];
  display: {
    isDisable: boolean;
    isReadonly: boolean;
    isHidden: boolean;
  };
  fields: string[];
}

export interface FieldValidation {
  id: string | number;
  title: string;
  description?: string;
  conditions: FieldCondition[];
  errorMessage: string;
}

interface Translations {
  title: string;
  description: string;
  hint: string;
  placeholder: string;
}

interface FieldOptions {
  css: [];
  attributes: [];
  className: string;
}

export interface FieldTranslation {
  es: Record<string, Translations>;
  vn: Record<string, Translations>;
}

interface Element {
  id?: number | string;
  name: string;
  type: string | ElementType | FieldType;
  dataType?: string | DataType;

  data?: (Element | Field)[] | null;
  value?: string | null;

  parentId?: number | string | null;
  placeholderId?: number | string | null;
  position?: number | null;
}

export interface Field extends Element {
  title?: string;
  description?: string;
  hint?: string;
  placeholder?: string;

  validation?: FieldValidation[],
  accessibility?: FieldAccessibility[];
  translation?: FieldTranslation[];

  options?: FieldOptions;

  min?: number;
  max?: number;
  length?: number;
  pattern?: string;

  isRequired?: boolean;
  isDisabled?: boolean;
  isReadonly?: boolean;
  isHidden?: boolean;
}
