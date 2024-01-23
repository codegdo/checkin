import { ChangeEvent } from "react";

import { TableField, KeyValue } from "./types";

interface IProps extends TableField {
  editable?: boolean;
  onChange?: (keyValue: KeyValue) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export function TableCell({ id, name, value = '', readonly, editable, onChange, onBlur }: IProps) {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    onChange?.({
      id: (id || name).toString(),
      value: event.currentTarget.value
    });
  };

  const handleBlur = () => {
    onBlur?.();
  }

  return (
    <td>
      {
        readonly ? (
          value as string
        ) : (
          editable ? <input type="text" value={value as string} onChange={handleChange} onBlur={handleBlur} /> : value as string
        )
      }
    </td>
  );
}