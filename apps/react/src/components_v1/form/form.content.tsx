import utils from "@/utils";
import { FieldType } from "./types";
import { useFormContext } from "./hooks";
import { ContextValue } from "./contexts";
import { FormSection } from "./form.section";
import { FormBlock } from "./form.block";
import { FormField } from "./form.field";
import { FormGroup } from "./form.group";
import { FormGrid } from "./form.grid";

export function FormContent() {
  const context = useFormContext() as ContextValue;
  return (
    <>
      {render(utils.groupDataForRender(context.data), context)}
    </>
  );
}

function render(data: FieldType[], context?: ContextValue) {

  return data?.map((item) => {
    const key = item.id || item.name;

    switch (item.type) {
      case 'section': {
        return (
          <FormSection key={key} {...item} context={context}>
            {render(item.data as FieldType[], context)}
          </FormSection>
        );
      }
      case 'block': {
        return (
          <FormBlock key={key} {...item} context={context}>
            {render(item.data as FieldType[], context)}
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
        return <FormField key={key} {...item} context={context} />
    }
  }) || null;
}