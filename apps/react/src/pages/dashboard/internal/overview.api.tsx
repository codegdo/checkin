import { PropsWithChildren } from "react";

import { ApiContext, ContextValue } from "@/contexts";
import { OverviewApiAction, useFetchProducts, useSaveProducts } from "./api";

export function OverviewApi({ children }: PropsWithChildren) {
  // TODO: perform permission check here
  const value: ContextValue = {
    [OverviewApiAction.GET_ALL_PRODUCTS]: useFetchProducts,
    [OverviewApiAction.SAVE_PRODUCTS]: useSaveProducts
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
}
