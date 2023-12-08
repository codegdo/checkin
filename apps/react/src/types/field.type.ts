export type FieldType = {
  text: string;
  number: string;
  password: string;
  email: string;
  date: string;
  datepicker: string;
  checkbox: string;
  radio: string;
  button: string;
  input: string;
  select: string;
  textarea: string;
}

export type ElementType = {
  div: string;
  button: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
}

export type DataType = {
  area: string;
  section: string;
  block: string;
  list: string;
  item: string;
  element: string;
  field: string;
  group: string;
  grid: string;
}

export interface Condition {
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
  conditions: Condition[];
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
  conditions: Condition[];
  errorMessage: string;
}

interface Translations {
  title: string;
  description: string;
  hint: string;
  placeholder: string;
}

export interface FieldTranslation {
  es: Record<string, Translations>;
  vn: Record<string, Translations>;
}

export interface Operator {
  id: string | number;
  fieldId: string | number;
  value: number;
  operator: 'add' | 'subtract' | 'multiply' | 'divide';
}

interface Options {
  css: [];
  attributes: [];
  className: string;
}

interface ElementField {
  id?: number | string | null;
  name: string;

  type: keyof FieldType | keyof ElementType;
  dataType?: keyof DataType;

  data?: (ElementField | FormField)[] | null;
  value?: string | null;

  mapToParent?: number | string | null;
  mapToChild?: number | string | null;
  position?: number | null;
}

interface FormField extends ElementField {
  title?: string;
  description?: string;
  placeholder?: string;
  hint?: string;

  validation?: FieldValidation[],
  accessibility?: FieldAccessibility[];
  translation?: FieldTranslation[];

  options?: Options;

  min: number;
  max: number;
  length: number;
  pattern: string;

  isRequired?: boolean;
  isDisabled?: boolean;
  isReadonly?: boolean;
  isHidden?: boolean;
}

export interface NormalizeField extends ElementField, FormField { }

