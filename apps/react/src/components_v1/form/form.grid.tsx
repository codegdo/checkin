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
  const arrayValue = formHelper.sortAndGroupByObject(props.value as KeyValue[], 'rowIndex') as KeyValue[];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ref } = (context || useFormContext()) as ContextValue;
  const [value, setValue] = useState(arrayValue);

  const handleChange = (keyValue: KeyValue) => {
    setValue(prevValue => {
      const updatedValue = prevValue.map((item, index) => {
        if (index === keyValue.rowIndex) {
          return { ...item, [keyValue.id]: keyValue.value };
        } else {
          return item;
        }
      });

      ref.values = { ...ref.values, [key]: updatedValue };
      ref.touched.add(key);

      console.log('TABLE CHANGE', keyValue);

      return updatedValue;
    });
  }

  useEffect(() => {
    ref.initialValues[key] = arrayValue;
    ref.values[key] = arrayValue;

    console.log(ref);
  }, []);

  return (
    <Table data={value} columns={props.data} onChange={handleChange} />
  )
}