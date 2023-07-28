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
  max?: number;
  min?: number;
  length?: number;
  pattern?: string;
}

interface Condition {
  id: string | number;
  comparison: 'equals' | 'contains' | 'startsWith' | 'endsWith';
  caseSensitivity: boolean;
  value: string;
  and?: Condition[];
  or?: Condition[];
}

interface Calculation {
  id: string | number;
  value: number;
  operator: 'add' | 'subtract' | 'multiply' | 'divide';
}

interface FormField extends ElementField {
  label?: string;
  description?: string;
  text?: string;

  isRequire?: boolean;
  isReadonly?: boolean;
  isHidden?: boolean;

  validation?: Validation;
  condition?: Condition[];
  calculation?: Calculation[];

  //isNew?: boolean;
  //isReview?: boolean;

  //isDependent?: boolean;
  //hasDependent?: boolean;

  //isConfig?: boolean;
  //isUnique?: boolean;
}

export interface NormalizeField extends ElementField, FormField { }

