import { GridViewProvider } from "./contexts";
import { GridViewContent } from "./gridview.content";
import { GridViewProps, useGridViewState } from "./hooks";

export function GridView(props: GridViewProps) {

  const contextValue = useGridViewState({ ...props });

  return (
    <GridViewProvider value={contextValue}>
      <GridViewContent />
    </GridViewProvider>
  );
}