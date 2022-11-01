export interface ControlProps {
  data: any;
  values: any;
  onChange: ({ key, value }: { key: string; value: any }) => void;
  onClick: () => void;
}
export interface ControlContextProps extends ControlProps { }
