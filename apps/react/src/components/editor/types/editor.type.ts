import { DataType as FieldDataType, Field as FieldType } from "@/components/types";
import { Dispatch } from "react";
import { Action } from ".";

export { FieldDataType as DataType };

export interface Field extends FieldType { }

export interface KeyValue {
  key: string;
  value: string;
}

export interface State {
  dataValue?: Field;
  dataSource?: Field;
  tab: string | null;
}

export interface CurrentRef {
  onChange?: ((keyValue: KeyValue) => void);
}

export interface ContextValue {
  current: CurrentRef;
  state: State;
  dispatch: Dispatch<Action>;
}