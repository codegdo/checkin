import { CustomField } from "./types";
import { FormField } from "./form.field";

interface IFormRenderProps {
  form: {
    title?: string;
    data?: CustomField[] | null;
  };
}

export function FormRender({ form }: IFormRenderProps) {

  const field = {
    ...form,
    name: 'form',
    type: 'form',
    componentType: 'area'
  }

  return (
    <>
      {renderData(field)}
    </>
  )
}

function renderData(field: CustomField) {
  const { data } = field;

  return data?.map((item) => {
    const key = item.id || item.name;
    return <FormField key={key} />
  });
}