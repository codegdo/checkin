import { IField } from "./types";
import { FieldText } from "./field.text";

interface IProps extends IField { }

export function Field(props: IProps) {
  switch (props.type) {
    case 'email':
    case 'text':
      return <FieldText {...props} />
  }
}