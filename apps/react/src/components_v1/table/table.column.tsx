import { useEffect } from "react";
import { Field } from "./types";
import { ContextValue } from "./contexts";

interface IProps extends Field {
  context?: ContextValue;
  rowIndex: number;
}

export function TableColumn({ context, value = '', name, rowIndex }: IProps) {

  useEffect(() => {
    if (context) {
      
      if (!(context.ref.values[rowIndex])) {
        context.ref.values.push({});
      }

      context.ref.values[rowIndex][name] = value as string;
    }
  }, []);

  return (
    <td>
      {value as string}
    </td>
  );
}