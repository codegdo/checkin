import { KeyValue } from "../input";

export interface ControlData {
  id?: number | string;
  className?: string;
  name: string;
  type?: string;
  data?: Record<string, any>;
  value?: string;
  isReset?: boolean;
  onChange?: (keyValue: KeyValue) => void;
  onClick?: (actionType: string) => void;
}