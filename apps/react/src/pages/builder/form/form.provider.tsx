
import { PropsWithChildren } from "react";

import { ProviderApi, ContextValue } from "@/contexts";
import { useGetAllForms, useGetFormById } from "./api";

export function FormProviderApi({ children }: PropsWithChildren) {
  const value: ContextValue = {
    useGetAllForms,
    useGetFormById
  };

  return (
    <ProviderApi value={value}>
      {children}
    </ProviderApi>
  );
}
