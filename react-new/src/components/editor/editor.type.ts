export interface EditorProps {
  type: string;
  values: any;
  onChange: () => {};
  onClick: () => {};
}
export interface EditorContextProps {
  data: any;
  values: any;
  tab: string;
  setTab: any;
  onChange: any;
  onClick: any;
}
