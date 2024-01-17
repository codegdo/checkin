import { useEffect, useState } from "react";
import { Table } from "../table";
import { ContextValue } from "./contexts";
import { FieldType, KeyValue } from "./types";
import { formHelper } from "./helpers";
import { useFormContext } from "./hooks";

type GridProps = FieldType & {
  context?: ContextValue
};

export function FormGrid({ context, ...props }: GridProps) {

  const key = (props.id || props.name).toString();
  const arrayValue = formHelper.sortAndGroup(props.value as KeyValue[], 'rowIndex');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ref } = (context || useFormContext()) as ContextValue;
  const [value, setValue] = useState<KeyValue[][]>(arrayValue);

  useEffect(() => {
    ref.initialValues[key] = arrayValue;
    ref.values[key] = arrayValue;

    console.log(ref);
  }, []);

  return (
    <Table data={value} columns={props.data} />
  )
}