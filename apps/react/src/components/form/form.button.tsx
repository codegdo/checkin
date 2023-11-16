//import { useWrapperContext } from "@/hooks";
import { ButtonType } from "./types";

//import FormContext from "./form.provider";

interface FormButtonProps {
  name: keyof ButtonType;
  value?: string;
}

export function FormButton({ name, value }: FormButtonProps) {
  //const ctx = useWrapperContext(FormContext);
  return <button type='button' name={name}>{value}</button>
}
