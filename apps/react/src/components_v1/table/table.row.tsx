import { useState } from "react";
import { ContextValue } from "./contexts";
import { TableColumn } from "./table.column";
import { KeyValue } from "./types";

interface IProps {
  context?: ContextValue;
  row: KeyValue;
  rowIndex: number;
}

export function TableRow({ context, row, rowIndex }: IProps) {
  const { table } = context as ContextValue;
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(!isEditing);
  }

  return (
    <tr>
      {
        table?.columns?.map((headColumn) => {
          const key = headColumn.id as keyof KeyValue;
          const value = row[key] as string;
          return <TableColumn key={headColumn.id} context={context} {...headColumn} value={value} rowIndex={rowIndex} isEditing={isEditing} />
        })
      }
      {
        <td><button type="button" onClick={handleClick}>Edit</button></td>
      }
    </tr>
  );
}
