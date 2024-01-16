import { ContextValue } from "./contexts";
import { useTableContext } from "./hooks";
import { TableRow } from "./table.row";

export function TableBody() {
  const context = useTableContext() as ContextValue;

  return (
    <tbody>
      {context.table.data?.map((row, index) => (
        <TableRow key={index} context={context} row={row} rowIndex={index} />
      ))}
    </tbody>
  );
}
