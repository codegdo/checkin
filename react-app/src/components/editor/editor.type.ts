export interface ItemData {
  id?: number | string;
  name?: string;
  label?: string;
  type?: string;
  dataType?: 'panel' | 'control';
  data?: ItemData[];
}

export interface DataSource {
  content?: ItemData[];
  design?: ItemData[];
  setting?: ItemData[];
}
