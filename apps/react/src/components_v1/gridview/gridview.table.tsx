import { ContextValue } from "./contexts";
import { Table } from "../table";

interface IProps {
  context: ContextValue
}

export function GridViewTable({ context }: IProps) {
  const { source } = context;
  return <Table columns={source?.columns} data={source?.data} />
}