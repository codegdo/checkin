import { ModalType } from "../types";

export interface ModalProps {
  title?: string;
  type: keyof typeof ModalType;
  data: any;
  onClick?: () => void;
}
export const useModalState = (props: ModalProps) => {
  return {
    ...props
  }
}