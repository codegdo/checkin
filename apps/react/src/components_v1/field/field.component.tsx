import { FieldText } from "./field.text";
import { useFieldState, FieldProps } from "./hooks";

export function Field(props: FieldProps) {
  const fieldProps = useFieldState({...props});

  switch (fieldProps.type) {
    case 'email':
    case 'text':
      return <FieldText {...fieldProps} />
    default: return null;
  }
}