import { GridViewFooter } from "./gridview.footer";
import { GridViewHeader } from "./gridview.header";
import { GridViewModal } from "./gridview.modal";
import { GridViewTable } from "./gridview.table";
import { useGridViewContext } from "./hooks/use-gridview-context";

export function GridViewContent() {
  const context = useGridViewContext();

  if (!context) return null;

  return (
    <>
      <GridViewHeader context={context} />
      <GridViewTable context={context} />
      <GridViewFooter />
      {
        context.state.modal && <GridViewModal context={context} />
      }
    </>
  );
}