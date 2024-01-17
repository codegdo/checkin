import { ContextValue } from "./contexts";
import { TableColumn } from "./table.column";
import { Field } from "./types";

interface IProps {
  context?: ContextValue;
  row: Field[];
  rowIndex: number;
}

export function TableRow({ context, row = [], rowIndex }: IProps) {
  
  return (
    <tr>
      {row.map((column) => (
        <TableColumn key={column.name} context={context} {...column} rowIndex={rowIndex} />
      ))}
    </tr>
  );
}
