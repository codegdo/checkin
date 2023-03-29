import { KeyValue } from "../input";

export interface ControlData {
  id?: number | string;
  name: string;
  type?: string;
  data?: Record<string, any>;
  value?: string;
  onChange?: (keyValue: KeyValue) => void;
  onClick?: () => void;
}