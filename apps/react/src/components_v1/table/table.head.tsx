import { ContextValue } from "./contexts";
import { useTableContext } from "./hooks";
import { Field } from "./types";

export function TableHead() {
  const { table } = useTableContext() as ContextValue;

  return (
    <thead>
      <tr>
        {
          table.columns?.map((column: Field) => {
            return <th key={column.name}>{column.title}</th>
          })
        }
      </tr>
    </thead>
  );
}