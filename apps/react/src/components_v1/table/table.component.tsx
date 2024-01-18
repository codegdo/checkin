import { TableProvider } from "./contexts/table.context";
import { TableOptions, useTableState } from "./hooks";
import { TableWrapper } from "./table.wrapper";
import { TableField, KeyValue } from "./types";

interface IProps {
  title?: string;
  data?: KeyValue[] | null;
  columns?: TableField[] | null;
  options?: TableOptions;
  status?: string;
  onClick?: (keyValue: KeyValue) => void;
  onChange?: (keyValue: KeyValue) => void;
}

export function Table({ data = [], columns = [], onClick, onChange }: IProps) {
  const contextValue = useTableState({ data, columns, onClick, onChange });

  return (
    <table>
      <TableProvider value={contextValue}>
        <TableWrapper />
      </TableProvider>
    </table>
  );
}

// npx madge src/components_v1/table/table.component.tsx --image src/components_v1/table/table.graph.png --warning