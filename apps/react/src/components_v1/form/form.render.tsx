import { groupDataForRender } from "@/utils";
import { FormFieldType } from "./types";
import { useFormContext } from "./hooks";
import { ContextValue } from "./contexts";
import { FormSection } from "./form.section";
import { FormBlock } from "./form.block";
import { FormField } from "./form.field";
import { FormElement } from "./form.element";

export function FormRender() {
  const context = useFormContext() as ContextValue;
  return (
    <>
      {render(groupDataForRender(context.form.data))}
    </>
  );
}

function render(data: FormFieldType[]) {

  return data?.map((item) => {
    const key = item.id || item.name;

    switch(item.dataType) {
      case 'section': {
        return (
          <FormSection key={key} {...item}>
            {render(item.data as FormFieldType[])}
          </FormSection>
        );
      }
      case 'block': {
        return (
          <FormBlock key={key} {...item}>
            {render(item.data as FormFieldType[])}
          </FormBlock>
        );
      }
      case 'field': {
        return <FormField key={key} {...item} />
      }
      case 'element': {
        return <FormElement key={key} {...item} />
      }
      default:
        return null;
    }
  }) || null;
}