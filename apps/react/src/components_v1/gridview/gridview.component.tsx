import { GridViewContext } from "./contexts";
import { GridViewContent } from "./gridview.content";
import { GridViewProps, useGridViewState } from "./hooks";

export function GridView(props: GridViewProps) {

  const contextValue = useGridViewState({ ...props });

  return (
    <GridViewContext.Provider value={contextValue}>
      <GridViewContent />
    </GridViewContext.Provider>
  );
}