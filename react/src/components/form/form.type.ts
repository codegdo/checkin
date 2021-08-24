type InputElementType = 'text' | 'number' | 'currency' | 'date' | 'password' | 'email';
type BlockElementType = 'div' | 'section' | 'header' | 'main' | 'footer' | 'nav';
type InlineElementType = 'button' | 'link' | 'label' | 'title';
type RoleElementType = 'block' | 'field' | 'element';

// FIELD
export type FieldType = {
  id: number;
  label: string;
  name: string;
  description: string;

  type: InputElementType;
  role: RoleElementType;

  data: any;
  value: string;
  defaultValue: string;

  position: number;
  positionParent: number;

  isRequired: boolean;
};

export type FieldData = Partial<FieldType>;

export type FieldProps = {
  field?: FieldData;
} & FieldData;

export type FieldContextProps =
  | {
    data?: FieldData;
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  | undefined;

// BLOCK
export type BlockType = {
  id: number;
  label: string;
  name: string;
  description: string;

  type: BlockElementType;
  role: RoleElementType;

  data: any;

  position: number;
  positionParent: number;
};

export type BlockData = Partial<BlockType>;

export type BlockProps = {
  block?: BlockData;
} & BlockData;

// ELEMENT
export type ElementType = {
  id: number;
  label: string;
  name: string;
  description: string;

  type: InlineElementType;
  role: RoleElementType;

  data: any;
  value: string;

  position: number;
  positionParent: number;
};

export type ElementData = Partial<ElementType>;

export type ElementProps = {
  element?: ElementData;
} & ElementData;

// FORM
export type FormType = {
  id: number;
  label: string;
  name: string;
  description: string;
  data: any;
  fields: FieldData[];
};

export type FormData = Partial<FormType>;

export type FormProps = {
  form?: FormData;
  status?: string;
  onSubmit?: (values: any) => void;
};

export type FormContextProps =
  | {
    data?: FormData;
    values?: any;
    errors?: any;
    submit?: string;
    status?: string;
    formSchema?: any;
    handleSubmit: (name: string) => void;
  }
  | undefined;

export type NormalizeData = Partial<FormData & BlockData & FieldData>;

export type RenderProps = {
  data?: any;
};
