export type InputElementType =
  | 'text'
  | 'number'
  | 'currency'
  | 'date'
  | 'password'
  | 'email';
type BlockElementType = 'div' | 'section' | 'header' | 'main' | 'footer' | 'nav';
type InlineElementType = 'button' | 'link' | 'label' | 'title';
type RoleElementType = 'block' | 'field' | 'inline';

// FIELD
export type FieldType = {
  id: number;
  name: string;
  title: string;
  description: string;

  type: InputElementType;
  role: RoleElementType;

  data: any;
  value: string;

  position: number;
  parentId: number;

  isRequired: boolean;

  map: string;
  lookup: string;
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
  name: string;
  title: string;
  description: string;

  type: BlockElementType;
  role: RoleElementType;

  data: any;

  position: number;
  parentId: number;
};

export type BlockData = Partial<BlockType>;

export type BlockProps = {
  block?: BlockData;
} & BlockData;

// INLINE
export type InlineType = {
  id: number;
  name: string;
  title: string;
  description: string;

  type: InlineElementType;
  role: RoleElementType;

  data: any;
  value: string;

  position: number;
  parentId: number;
};

export type InlineData = Partial<InlineType>;

export type InlineProps = {
  inline?: InlineData;
} & InlineData;

// FORM
export type FormType = {
  id: number;
  name: string;
  title: string;
  description: string;
  data: any;
  fields: FieldData[];
};

export type FormData = Partial<FormType>;

export type FormProps = {
  form?: FormData;
  status?: string;
  isKey?: boolean;
  isMap?: boolean;
  onSubmit?: (values: any) => void;
  onCallback?: (name: string) => void;
};

export type FormContextProps =
  | {
    data?: FormData;
    values?: any;
    errors?: any;
    submit?: string;
    status?: string;
    formSchema?: any;
    isKey?: boolean;
    isMap?: boolean;
    handleClick: (name: string) => void;
  }
  | undefined;

export type NormalizeData = Partial<FormData & BlockData & FieldData>;

export type RenderProps = {
  data?: any;
};
