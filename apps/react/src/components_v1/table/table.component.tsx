import { TableProvider } from "./contexts/table.context";
import { TableOptions, useTableState } from "./hooks";
import { TableWrapper } from "./table.wrapper";
import { Field, KeyValue } from "./types";

interface IProps {
  title?: string;
  data?: KeyValue[][] | null;
  columns?: Field[] | null;
  options?: TableOptions;
  status?: string;
  callback?: () => void;
}

export function Table({ data = [], columns = [], callback }: IProps) {
  const contextValue = useTableState({ data, columns, callback });

  return (
    <table>
      <TableProvider value={contextValue}>
        <TableWrapper />
      </TableProvider>
    </table>
  );
}

// npx madge src/components_v1/table/table.component.tsx --image src/components_v1/table/table.graph.png --warning