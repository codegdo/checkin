import { useEffect } from "react";
import { Table } from "../table";
import { ContextValue } from "./contexts";
import { FieldType, KeyValue, RowValue } from "./types";
import { ObjectShape, formHelper, formValidator } from "./helpers";
import { useFormContext } from "./hooks";

type GridProps = FieldType & {
  context?: ContextValue
};

export function FormGrid({ context, ...props }: GridProps) {
  const key = (props.id || props.name).toString();
  const arrayValue = formHelper.sortAndGroupByObject(props.value as KeyValue[], 'rowIndex') as KeyValue[];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ref, onCallback } = (context || useFormContext()) as ContextValue;

  const handleChange = (rowValue?: RowValue) => {
    if(!rowValue) return;

    const {rowData, rowIndex} = rowValue;
    const updatedValue = [...ref.values[key] as KeyValue[]];

    updatedValue[rowIndex] = { ...updatedValue[rowIndex], ...rowData };
    ref.values = { ...ref.values, [key]: updatedValue };
  }

  const handleAdd = async () => {
    try {
      const getData = await onCallback?.({type:'add', field: props});
      console.log('getData', getData);
    } catch(err) {
      console.log('FORMGRID ERROR', err);
    }
  }

  const handleEdit = () => {}

  useEffect(() => {
    ref.initialValues[key] = arrayValue;
    ref.values[key] = arrayValue;

    const validationData = props.data || [];
    const gridSchemaObject = validationData.reduce((schema, field) => {
      const keyId = (props.id || props.name).toString();
      return {...schema, [keyId]: formValidator.createSchema(field)}
    }, {});

    const gridSchema = formValidator.validator.object(gridSchemaObject);

    // Set up validation schema for the grid field
    ref.validation = ref.validation.shape({
      [key]: formValidator.validator.array(gridSchema),
    } as ObjectShape);

    console.log(ref);
  }, []);

  return (
    <div>
      <button type="button" name="add" onClick={handleAdd}>Add</button>
      <button type="button" name="add" onClick={handleEdit}>Edit</button>
      <Table data={arrayValue} columns={props.data} onChange={handleChange} />
    </div>
  )
}