import { useState } from "react";
import { ContextValue } from "./contexts";
import { TableCell } from "./table.cell";
import { KeyValue, TableActionType } from "./types";

interface IProps {
  context?: ContextValue;
  value: KeyValue;
  rowIndex: number;
}

export function TableRow({ context, value, rowIndex }: IProps) {
  const { source, onUpdate } = context as ContextValue;

  const [rowValue, setRowValue] = useState({ ...value });

  const handleClick = () => {
    onUpdate({
      type: TableActionType.REMOVE,
      payload: { rowValue, rowIndex }
    });
  }

  const handleChange = (keyValue: KeyValue) => {
    console.log('ROW CHANGE', keyValue);
    setRowValue((prevValue) => {
      return { ...prevValue, [keyValue.id as string]: keyValue.value }
    });
  }

  const handleBlur = () => {
    onUpdate({
      type: TableActionType.UPDATE,
      payload: { rowValue, rowIndex }
    });
  }

  return (
    <tr>
      {
        source?.columns?.map((headColumn) => {
          const key = headColumn.id as keyof KeyValue;
          const cellValue = rowValue[key] as string;

          return (
            <TableCell
              key={headColumn.id}
              {...headColumn}
              value={cellValue}
              editable={source?.editable}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          );
        })
      }
      {
        <td><button type="button" onClick={handleClick}>Remove</button></td>
      }
    </tr>
  );
}
