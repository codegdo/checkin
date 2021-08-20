type InputType = 'text' | 'number' | 'currency' | 'date' | 'password';
type ElementType = 'div' | 'section' | 'header' | 'main' | 'footer';
type RoleType = 'block' | 'field' | 'element';

// FIELD
export type FieldType = {
  id: number;
  label: string;
  name: string;

  type: InputType;
  role: RoleType;

  data: any;

  value: string;
  defaultValue: string;

  index: number;
  indexParent: number;
}

export type FieldData = Partial<FieldType>;

export type FieldProps = {
  field?: FieldData;
} & FieldData;

export type FieldContextProps = {
  data?: FieldData,
  value: string,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
} | undefined;

// BLOCK
export type BlockType = {
  id: number;

  type: ElementType;
  role: RoleType;

  data: any;

  index: number;
  indexParent: number;
}

export type BlockData = Partial<BlockType>

export type BlockProps = {
  block?: BlockData;
} & BlockData

// ELEMENT
export type ElementData = Partial<BlockType>

export type ElementProps = {
  element?: ElementData;
} & ElementData

// FORM
export type FormData = {
  id: number;
  name: string;
  data: any;
  fields: FieldData[];
  buttons: ElementData[]
}

export type FormProps = {
  form?: FormData;
  onSubmit?: (values: any) => void;
}

export type FormContextProps = {
  data?: FormData;
  values: any;
  handleSubmit: (name: string) => void;
} | undefined;

export type NormalizeData = Partial<FormData & BlockData & FieldData>

export type RenderProps = {
  data?: any;
}