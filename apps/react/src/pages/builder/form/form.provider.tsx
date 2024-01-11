import { PropsWithChildren } from "react";

import { ProviderApi, ContextValue } from "@/contexts";
import { useFetchAllForms, useFetchFormById, FormApiAction } from "./api";

export function FormProviderApi({ children }: PropsWithChildren) {
  // TODO: perform permission check here
  const value: ContextValue = {
    [FormApiAction.GET_ALL_FORMS]: useFetchAllForms,
    [FormApiAction.GET_FORM_BY_ID]: useFetchFormById
  };

  return (
    <ProviderApi value={value}>
      {children}
    </ProviderApi>
  );
}
