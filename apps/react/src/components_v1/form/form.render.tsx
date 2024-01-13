import { groupDataForRender } from "@/utils";
import { FormFieldType } from "./types";
import { FormField } from "./form.field";

interface IProps {
  data: FormFieldType[];
}

export function FormRender({ data }: IProps) {
  return (
    <>
      {renderData(groupDataForRender(data))}
    </>
  );
}

function renderData(data: FormFieldType[]) {

  return data.map((field) => {
    const key = field.id || field.name;

    return <FormField key={key} />
  }) || null;
}