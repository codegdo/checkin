import { useWrapperContext } from "@/hooks"
import { TableContext } from "../contexts";

export const useTableContext = () => {
  return useWrapperContext(TableContext);
}