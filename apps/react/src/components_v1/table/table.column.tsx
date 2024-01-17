import { useEffect } from "react";
import { Field } from "./types";
import { ContextValue } from "./contexts";

interface IProps extends Field {
  context?: ContextValue;
  rowIndex: number;
}

export function TableColumn({ context, ...props }: IProps) {

  useEffect(() => {
    // if (context) {

    //   if (!(context.ref.values[rowIndex])) {
    //     context.ref.values.push({});
    //   }

    //   context.ref.values[rowIndex][id?.toString() as string] = value as string;
    // }
    console.log('COLUMN', props);
  }, []);

  return (
    <td>
      test
    </td>
  );
}