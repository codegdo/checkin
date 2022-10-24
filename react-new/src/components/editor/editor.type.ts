export interface EditorProps {
  type: string;
  values: any;
  onChange: () => {};
  onClick: () => {};
}
export interface EditorContextProps extends EditorProps {}
