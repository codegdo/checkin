export enum DataType {
  AREA = 'area',
  SECTION = 'section',
  BLOCK = 'block',
  HOLDER = 'holder',

  LIST = 'list',
  ITEM = 'item',

  BUTTON = 'button',
  LINK = 'link',
  PARAGRAPH = 'paragraph',
  IMAGE = 'image',

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

// Base interface with common properties
interface Base {
  id?: number | string | null;
  name: string;
  type: DataType | string;
  value?: ObjectValue | null;
  defaultValue?: ObjectValue | null;
}

// Interface for controls (e.g., buttons, links)
export interface IControl extends Base {
  data?: IControl[] | null;
}

// Interface for fields (e.g., text, number, checkbox)
export interface IField extends Base {
  title?: string | null;
  description?: string | null;
  hint?: string | null;

  // Additional attributes for form fields
  placeholder?: string | null;
  minLength?: number | null;
  maxLength?: number | null;
  pattern?: string | null;

  // Validation options
  readonly?: boolean; // readonly for grid component will not editable
  disabled?: boolean;
  required?: boolean;
  visible?: boolean;

  // Specific to date
  minDate?: string | null;
  maxDate?: string | null;

  // Input styling
  style?: string | null;

  // Additional data for nested fields
  data?: IField[] | null;

  // Parent field information
  parentId?: number | string | null;

  // Position in the form
  position?: number | null;
}

// Combined type for fields and controls
export type FieldType = IControl & IField;

// Interface for KeyValue, representing key-value pairs with an optional rowIndex
export type KeyValue = Record<string, string | number | null>;

// Type for the value property that can be a string, KeyValue array, or a record
export type ObjectValue = string | KeyValue | KeyValue[] | null;

export type RowValue = { rowValue: KeyValue, rowIndex: number }

