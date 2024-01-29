import { ContextValue } from "./contexts";
import { Table } from "../table";

interface IProps {
  context: ContextValue
}

export function GridViewTable({ context }: IProps) {
  const { columns, data } = context;
  return <Table columns={columns} data={data} />
}