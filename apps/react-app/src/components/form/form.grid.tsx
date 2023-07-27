import { useWrapperContext } from "@/hooks";
import FormContext from "./form.provider";

export function FormGrid(props: any) {
  const { data } = useWrapperContext(FormContext);
  return (
    <>
      {
        props.children
      }
    </>
  )
}