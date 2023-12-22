export interface IControl {
  id?: string | number;
  type: string;
  name: string;
  value?: string;
  data?: JSON | null;
}
