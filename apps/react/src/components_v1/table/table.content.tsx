import { TableBody } from "./table.body";
import { TableHeader } from "./table.header";
import { TablePagination } from "./table.pagination";
import { TableToolbar } from "./table.toolbar";

export function TableContent() {
  return (
    <>
      <TableToolbar />
      <table>
        <TableHeader />
        <TableBody />
      </table>
      <TablePagination />
    </>
  );
}