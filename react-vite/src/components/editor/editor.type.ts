export interface ItemData {
  id?: number | string;
  name?: string;
  label?: string;
  type?: string;
  dataType?: 'panel' | 'control';
  data?: ItemData[];
}

export interface EditorData {
  content?: ItemData[];
  design?: ItemData[];
  setting?: ItemData[];
}
