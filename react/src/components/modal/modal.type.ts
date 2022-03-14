export type ModalProps = {
  show: boolean;
  onModal?: (values: any) => void;
};

export type ModalContextProps =
  | {
      handleClick: (name: string) => void;
    }
  | undefined;
