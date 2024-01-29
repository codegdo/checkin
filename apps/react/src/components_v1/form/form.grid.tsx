import { useEffect, useRef, useState } from "react";
import { ContextValue } from "./contexts";
import { FieldType, KeyValue, } from "./types";
import { ObjectShape, ValidationObject, formHelper, formValidator } from "./helpers";
import { useFormContext } from "./hooks";
import { GridView } from "../gridview/gridview.component";

type GridProps = FieldType & {
  context?: ContextValue
};

export function FormGrid({ context, ...props }: GridProps) {
  const key = (props.id || props.name).toString();
  const arrayValue = formHelper.sortAndGroupByObject(props.value as KeyValue[], 'rowIndex') as KeyValue[];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ref, errors, onClick } = (context || useFormContext()) as ContextValue;
  const { current } = useRef<ValidationObject>({ validation: formValidator.validator.object() });
  const [error, setError] = useState<string>();

  const handleChange = async (updatedValue: KeyValue[]) => {
    //ref.values[key] = updatedValue.trim();
    ref.touched.add(key);
    ref.changed.add(key);
    console.log('CHANGE', ref, props);
  };

  const handleBlur = async () => {
    for (const changedKey of ref.changed) {
      if (changedKey in ref.validation.fields) {
        const valueToValidate = ref.values[changedKey]?.toString().trim() || '';

        const validationSchema = {
          fieldSchema: current.validation,
          values: { [changedKey]: valueToValidate }
        }

        const err = await formValidator.validateField(validationSchema);

        setError(err);

      }
    }
    console.log('BLUR', ref);
  };

  const handleFocus = () => {
    ref.changed.clear();
    ref.touched.add(key);
    ref.changed.add(key);
  };

  const handleClick = async ({ type, requiredModal }: { type: string; requiredModal?: boolean; }) => {
    return onClick?.({ type, eventTarget: props, requiredModal });
  }

  useEffect(() => {
    ref.initialValues[key] = arrayValue;
    ref.values[key] = arrayValue;

    const validationData = props.data || [];
    const gridSchemaObject = validationData.reduce((schema, field) => {
      const keyId = (field.id || field.name).toString();
      return { ...schema, [keyId]: formValidator.createSchema(field) }
    }, {});

    const gridSchema = current.validation.shape(gridSchemaObject);

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
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onClick={handleClick}
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