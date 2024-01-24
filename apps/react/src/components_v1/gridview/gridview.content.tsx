import { GridViewFooter } from "./gridview.footer";
import { GridViewHeader } from "./gridview.header";
import { GridViewTable } from "./gridview.table";

export function GridViewContent() {
  return (
    <>
      <GridViewHeader />
      <GridViewTable />
      <GridViewFooter />
    </>
  );
}