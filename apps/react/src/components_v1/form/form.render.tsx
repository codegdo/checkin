import { groupDataForRender } from "@/utils";
import { FormFieldType } from "./types";
import { FormField } from "./form.field";
import { useFormContext } from "./hooks";
import { ContextValue } from "./contexts";

export function FormRender() {
  const context = useFormContext() as ContextValue;
  return (
    <>
      {render(groupDataForRender(context.form.data))}
    </>
  );
}

function render(data: FormFieldType[]) {

  return data.map((field) => {
    const key = field.id || field.name;

    return <FormField key={key} />
  }) || null;
}