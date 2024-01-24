import { useEffect, useState } from "react";
import { Table } from "../table";
import { ContextValue } from "./contexts";
import { FieldType, KeyValue, } from "./types";
import { ObjectShape, formHelper, formValidator } from "./helpers";
import { useFormContext } from "./hooks";
import { GridView } from "../gridview/gridview.component";


type GridProps = FieldType & {
  context?: ContextValue
};

export function FormGrid({ context, ...props }: GridProps) {
  const key = (props.id || props.name).toString();
  const arrayValue = formHelper.sortAndGroupByObject(props.value as KeyValue[], 'rowIndex') as KeyValue[];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ref, onCallback } = (context || useFormContext()) as ContextValue;

  useEffect(() => {
    ref.initialValues[key] = arrayValue;
    ref.values[key] = arrayValue;

    const validationData = props.data || [];
    const gridSchemaObject = validationData.reduce((schema, field) => {
      const keyId = (field.id || field.name).toString();
      return { ...schema, [keyId]: formValidator.createSchema(field) }
    }, {});

    const gridSchema = formValidator.validator.object(gridSchemaObject);

    // Set up validation schema for the grid field
    ref.validation = ref.validation.shape({
      [key]: formValidator.validator.array(gridSchema),
    } as ObjectShape);

    //console.log('GRID', ref);
  }, []);

  return (
    <div>
      <GridView
        columns={props.data as FieldType[]}
        data={arrayValue}
      />
    </div>
  )
}

/*
export function FormGrid({ context, ...props }: GridProps) {
  const key = (props.id || props.name).toString();
  const arrayValue = formHelper.sortAndGroupByObject(props.value as KeyValue[], 'rowIndex') as KeyValue[];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ref, onCallback } = (context || useFormContext()) as ContextValue;
  const [isEditing, setIsEditing] = useState(false);


  const handleChange = (updateValue: KeyValue[]) => {
    const newValue = [...updateValue];
    ref.values = { ...ref.values, [key]: newValue };

    console.log('FORMGRID CHANGE', ref);
  }

  const handleAdd = async () => {
    try {
      const getData = await onCallback?.({ type: 'add', field: props });
      console.log('getData', getData);
    } catch (err) {
      console.log('FORMGRID ERROR', err);
    }
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  useEffect(() => {
    ref.initialValues[key] = arrayValue;
    ref.values[key] = arrayValue;

    const validationData = props.data || [];
    const gridSchemaObject = validationData.reduce((schema, field) => {
      const keyId = (field.id || field.name).toString();
      return { ...schema, [keyId]: formValidator.createSchema(field) }
    }, {});

    const gridSchema = formValidator.validator.object(gridSchemaObject);

    // Set up validation schema for the grid field
    ref.validation = ref.validation.shape({
      [key]: formValidator.validator.array(gridSchema),
    } as ObjectShape);

    //console.log('GRID', ref);
  }, []);

  return (
    <div>
      <div>
        <button type="button" name="add" onClick={handleAdd}>Add</button>
        <input type="checkbox" name="edit" onClick={handleEdit} />
      </div>
      <Table
        columns={props.data}
        data={arrayValue}
        editable={isEditing}
        onChange={handleChange}
      />
    </div>
  )
}
*/