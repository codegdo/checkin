import { useState } from "react";
import { ContextValue } from "./contexts";
import { TableColumn } from "./table.column";
import { KeyValue, TableActionType } from "./types";

interface IProps {
  context?: ContextValue;
  row: KeyValue;
  rowIndex: number;
}

export function TableRow({ context, row, rowIndex }: IProps) {
  const { table, onUpdate } = context as ContextValue;
  const [isEditing, setIsEditing] = useState(false);
  const [rowData, setRowData] = useState({ ...row });

  const handleClick = () => {
    setIsEditing(!isEditing);
  }

  const handleChange = (keyValue: KeyValue) => {
    console.log('ROW CHANGE', keyValue);
    setRowData((prevData) => {
      return { ...prevData, [keyValue.id as string]: keyValue.value }
    });
  }

  const handleBlur = () => {
    onUpdate({
      type: TableActionType.UPDATE,
      payload: { rowData, rowIndex }
    });
  }

  return (
    <tr>
      {
        table?.columns?.map((headColumn) => {
          const key = headColumn.id as keyof KeyValue;
          const value = rowData[key] as string;

          return (
            <TableColumn
              key={headColumn.id}
              {...headColumn}
              value={value}
              isEditing={isEditing}
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
