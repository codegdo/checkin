export interface EditorProps {
  type: string;
  values: any;
  onChange: ({ key, value }: { key: string; value: any }) => void;
  onClick: () => void;
}
export interface EditorContextProps {
  editor: any;
  values: any;
  tab: string;
  setTab: any;
  //setValues: any;
  onChange: any;
  onClick: any;
}
