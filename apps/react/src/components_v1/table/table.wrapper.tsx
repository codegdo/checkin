import { TableBody } from "./table.body";
import { TableCaption } from "./table.caption";
import { TableFoot } from "./table.foot";
import { TableHead } from "./table.head";

export function TableWrapper() {
  return (
    <>
      <TableCaption />
      <TableHead />
      <TableBody />
      <TableFoot />
    </>
  );
}