import { PropsWithChildren } from "react";

export interface DragDropProps extends PropsWithChildren {
  data?: any;
  onCallback?: (key?: string, values?: any) => void;
}