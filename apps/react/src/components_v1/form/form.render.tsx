import { groupDataForRender } from "@/utils";
import { FormFieldType } from "./types";
import { useFormContext } from "./hooks";
import { ContextValue } from "./contexts";
import { FormSection } from "./form.section";
import { FormBlock } from "./form.block";
import { FormField } from "./form.field";
import { FormGroup } from "./form.group";
import { FormGrid } from "./form.grid";

export function FormRender() {
  const context = useFormContext() as ContextValue;
  return (
    <>
      {render(groupDataForRender(context.form.data), context)}
    </>
  );
}

function render(data: FormFieldType[], context?: ContextValue) {

  return data?.map((item) => {
    const key = item.id || item.name;

    switch(item.type) {
      case 'section': {
        return (
          <FormSection key={key} {...item} context={context}>
            {render(item.data as FormFieldType[], context)}
          </FormSection>
        );
      }
      case 'block': {
        return (
          <FormBlock key={key} {...item} context={context}>
            {render(item.data as FormFieldType[], context)}
          </FormBlock>
        );
      }
      case 'group': {
        return <FormGroup key={key} {...item} context={context} />
      }
      case 'grid': {
        return <FormGrid key={key} {...item} context={context} />
      }
      default:
        <FormField key={key} {...item} context={context} />
    }
  }) || null;
}