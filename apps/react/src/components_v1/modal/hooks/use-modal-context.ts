import { useWrapperContext } from "@/hooks"
import { ModalContext } from "../contexts";

export const useModalContext = () => {
  return useWrapperContext(ModalContext);
}