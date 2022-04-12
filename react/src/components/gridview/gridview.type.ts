export type GridViewProps = {
  config?: any,
  data?: any,
  columns?: any,
  fields?: any,
  onSearch?: () => void
}
export type GridViewContextProps = {
  data: any,
  columns: any,
  fields: any
} | undefined;

export type ControlSearchProps = {
  data?: any
}