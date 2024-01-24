import { PropsWithChildren } from "react";

import { ProviderApi, ContextValue } from "@/contexts";
import { OverviewApiAction, useFetchProducts, useSaveProducts } from "./api";

export function OverviewProviderApi({ children }: PropsWithChildren) {
  // TODO: perform permission check here
  const value: ContextValue = {
    [OverviewApiAction.GET_ALL_PRODUCTS]: useFetchProducts,
    [OverviewApiAction.SAVE_PRODUCTS]: useSaveProducts
  };

  return (
    <ProviderApi value={value}>
      {children}
    </ProviderApi>
  );
}
