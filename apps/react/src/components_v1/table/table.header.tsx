import { ContextValue } from "./contexts";
import { useTableContext } from "./hooks";
import { TableField } from "./types";

export function TableHeader() {
  const { source } = useTableContext() as ContextValue;

  return (
    <thead>
      <tr>
        {
          source.columns?.map((column: TableField) => {
            return <th key={column.name}>{column.title}</th>
          })
        }
      </tr>
    </thead>
  );
}