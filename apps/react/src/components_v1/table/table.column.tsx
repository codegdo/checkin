import { TableField } from "./types";
import { ContextValue } from "./contexts";
import { ChangeEvent } from "react";

interface IProps extends TableField {
  context?: ContextValue;
  rowIndex: number;
  isEditing?: boolean;
  onClick?: () => void;
}

export function TableColumn({ id, value = '', readonly, context, rowIndex, isEditing }: IProps) {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    context?.onChange?.({
      id: id as number | string,
      value: event.currentTarget.value,
      rowIndex
    });
  };

  return (
    <td>
      {
        readonly ? (
          value as string
        ) : (
          isEditing ? <input type="text" value={value as string} onChange={handleChange} /> : value as string
        )
      }
    </td>
  );
}