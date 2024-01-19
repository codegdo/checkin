import { ChangeEvent } from "react";

import { TableField, KeyValue } from "./types";

interface IProps extends TableField {
  isEditing?: boolean;
  onChange?: (keyValue: KeyValue) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export function TableColumn({ id, value = '', readonly, isEditing, onChange, onBlur }: IProps) {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    onChange?.({
      id: id as number | string,
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
          isEditing ? <input type="text" value={value as string} onChange={handleChange} onBlur={handleBlur} /> : value as string
        )
      }
    </td>
  );
}