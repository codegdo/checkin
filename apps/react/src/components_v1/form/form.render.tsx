import { ComponentField } from "../types";
import { FormField } from "./form.field";

interface IFormRenderProps {
  title?: string;
  data?: ComponentField[];
}

export function FormRender({ data }: IFormRenderProps) {
  return (
    <>{renderData(data)}</>
  )
}

function renderData(data: ComponentField[] = []) {
  return data.map((item) => {
    const key = item.id || item.name;
    return <FormField key={key} />
  });
}