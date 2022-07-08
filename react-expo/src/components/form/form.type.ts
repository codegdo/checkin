enum FieldTypeEnum {
  TEXT = 'text',
  NUMBER = 'number',
  CURRENCY = 'currency',
  DATE = 'date',
  EMAIL = 'email',
  DIV = 'div',
  SECTION = 'section',
  HEADER = 'header',
  MAIN = 'main',
  FOOTER = 'footer',
  NAV = 'nav',
  BUTTON = 'button',
  LINK = 'link',
  LABEL = 'label',
  TITLE = 'title'
}

export interface FieldData {
  id?: number | string;
  className?: string;

  title?: string;
  description?: string;

  type: 'text' | 'number' | 'currency' | 'date' | 'email' | 'password' | 'div' | 'section' | 'header' | 'main' | 'footer' | 'nav' | 'button' | 'link' | 'label' | 'title';
  role?: 'block' | 'field' | 'component';

  data?: any;
  value?: string;

  position?: number;
  parentId?: string | number;

  isRequired?: boolean;

  map?: string;
  lookup?: string;
}

export interface FormData {
  id?: number | string;
  className?: string;
  name: string;
  title: string;
  description?: string;
  data?: any;
  fields?: FieldData[]
}

export interface FormProps {
  className?: string;
  data?: FormData;
  callback?: (values: Record<string, string>) => Promise<void>;
}

export type RenderProps = {
  data: any
}

export interface BlockProps extends FieldData {
  id?: number | string;
}

export interface FieldProps extends FieldData {
  name: string;
  placeholder?: string;
}