import { PropsWithChildren } from "react";

import { ApiContext, ContextValue } from "@/contexts";
import { useFetchAllForms, useFetchFormById, FormApiAction } from "./api";

export function FormApi({ children }: PropsWithChildren) {
  // TODO: perform permission check here
  const value: ContextValue = {
    [FormApiAction.GET_ALL_FORMS]: useFetchAllForms,
    [FormApiAction.GET_FORM_BY_ID]: useFetchFormById
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
}
