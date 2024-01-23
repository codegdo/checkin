import { Field, KeyValue, RowValue } from "../types";

export interface GridViewProps {
  columns?: Field[];
  data?: KeyValue[];
  status?: string;
  onClick?: (keyValue: KeyValue) => void;
  onChange?: (rowValue?: RowValue) => void;
}

export const useGridViewState = ({ status, onClick, onChange, ...props }: GridViewProps) => {

  return {
    source: { ...props },
    status,
    onClick,
    onChange
  }
}