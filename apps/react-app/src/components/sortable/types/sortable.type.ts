export interface Field {
  id?: number | string | null;
  name: string;
  group: string;
  type: string;
  data?: Field[] | null;
  parentId?: string | number | null;
  position?: number;
}

export interface ExtendedField extends Field {
  siblings?: string[]
}


export interface ElementInnerSize {
  innerWidth: number;
  innerHeight: number;
}