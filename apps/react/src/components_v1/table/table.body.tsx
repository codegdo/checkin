import { ContextValue } from "./contexts";
import { useTableContext } from "./hooks";
import { TableRow } from "./table.row";

export function TableBody() {
  const context = useTableContext() as ContextValue;

  return (
    <tbody>
      {context.source.data?.map((rowValue, index) => (
        <TableRow key={index} context={context} value={rowValue} rowIndex={index} />
      ))}
    </tbody>
  );
}
