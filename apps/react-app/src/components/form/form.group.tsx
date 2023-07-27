import { useWrapperContext } from "@/hooks";
import FormContext from "./form.provider";

export function FormGroup(props: any) {
  const { data } = useWrapperContext(FormContext);
  return (
    <>
      {
        props.children
      }
    </>
  )
}