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

export type GroupType = {
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

interface ElementField {
  id?: number | string;
  name: string;

  type: keyof FieldType | keyof ElementType;
  group?: keyof GroupType;

  data?: (ElementField | FormField)[] | null;
  value?: string | null;

  parentId?: number | string | null;
  childId?: number | string | null;
  position?: number | null;
}

interface Validation {
  maxLength?: number;
  minLength?: number;
  length?: number;
  pattern?: string;
}

interface Condition {
  id: string | number;
  fieldId: string | number;
  comparison: 'equals' | 'contains' | 'startsWith' | 'endsWith';
  caseSensitivity: boolean;
  value: string;
  and?: Condition[];
  or?: Condition[];
}

interface Operator {
  id: string | number;
  fieldId: string | number;
  value: number;
  operator: 'add' | 'subtract' | 'multiply' | 'divide';
}

interface Option {
  css: [],
  setting: {
    isReadonly: boolean;
    isShow: boolean;
  }
}

interface FormField extends ElementField {
  label?: string;
  description?: string;
  text?: string;

  validation?: Validation;
  calculation?: {
    operators: Operator[]
  },
  visibility?: {
    conditions: Condition[],
    actions: {
      hidden: boolean;
      readonly: boolean;
    }
  };
  option?: Option;

  isRequire?: boolean;

  isReadonly?: boolean;
  isHidden?: boolean;

  isInternal?: boolean;


  //isNew?: boolean;
  //isReview?: boolean;

  //isDependent?: boolean;
  //hasDependent?: boolean;

  //isConfig?: boolean;
  //isUnique?: boolean;
}

export interface NormalizeField extends ElementField, FormField { }

