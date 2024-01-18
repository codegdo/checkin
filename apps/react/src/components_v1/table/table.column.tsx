import { TableField } from "./types";
import { ContextValue } from "./contexts";
import { ChangeEvent } from "react";

interface IProps extends TableField {
  context?: ContextValue;
  rowIndex: number;
}

export function TableColumn({ id, value = '', readonly, context, rowIndex }: IProps) {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
          <input type="text" value={value as string} onChange={handleChange} />
        )
      }
    </td>
  );
}