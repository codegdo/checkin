type InputType = 'text' | 'number' | 'currency' | 'date' | 'password';
type BlockElementType = 'div' | 'section' | 'header' | 'main' | 'footer' | 'button';
type InlineElementType = 'button';
type RoleType = 'block' | 'field' | 'element';

// FIELD
export type FieldType = {
  id: number;
  label: string;
  description: string;
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
  label: string;
  description: string;
  name: string;

  type: BlockElementType;
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
export type ElementType = {
  id: number;
  label: string;
  description: string;
  name: string;

  type: InlineElementType;
  role: RoleType;

  data: any;

  index: number;
  indexParent: number;
}

export type ElementData = Partial<ElementType>

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