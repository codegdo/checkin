import { useEffect } from "react";
import { Field } from "./types";
import { ContextValue } from "./contexts";

interface IProps extends Field {
  context?: ContextValue;
  rowIndex: string;
}

export function TableColumn({ context, value = '', name, rowIndex }: IProps) {

  useEffect(() => {
    if (context) {
      // console.log(context);
      // if (!(rowIndex in context.ref?.values)) {
      //   context.ref?.values[name] = {};
      // }

      // context.ref?.values ? [rowIndex][name] = value;
    }
  }, []);

  return (
    <td>
      {value as string}
    </td>
  );
}