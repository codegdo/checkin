import { Table } from "../table";
import { ContextValue } from "./contexts";
import { FieldType } from "./types";

type GridProps = FieldType & {
  context?: ContextValue
};

export function FormGrid({ ...props }: GridProps) {
  return (
    <Table data={props.value as FieldType[][]} columns={props.data} />
  )
}