export interface IControl {
  id?: string | number;
  type: string;
  name: string;
  value?: string | null;
  data?: JSON | null;
}
