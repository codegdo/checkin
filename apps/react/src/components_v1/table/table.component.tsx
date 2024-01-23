import { TableProvider } from "./contexts/table.context";
import { TableProps, useTableState } from "./hooks";
import { TableContent } from "./table.content";

export function Table(props: TableProps) {
  const contextValue = useTableState({ ...props });

  return (
    <div>
      <TableProvider value={contextValue}>
        <TableContent />
      </TableProvider>
    </div>
  );
}

// npx madge src/components_v1/table/table.component.tsx --image src/components_v1/table/table.graph.png --warning