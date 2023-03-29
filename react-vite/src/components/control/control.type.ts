export interface ControlData {
  id?: number | string;
  type?: string;
  value?: string;
  onChange?: () => void;
  onClick?: () => void;
}