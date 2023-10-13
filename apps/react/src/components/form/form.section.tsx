import { PropsWithChildren } from "react";

interface FormSectionProps extends PropsWithChildren { }

export function FormSection({ children }: FormSectionProps) {

  return (
    <>{children}</>
  )
}
