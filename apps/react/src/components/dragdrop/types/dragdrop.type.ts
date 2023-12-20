import { DataType as FieldDataType, Field as FieldType } from "@/components/types";
import { CurrentRef } from "../hooks";
import { Action, State } from "../reducers";
import { Dispatch } from "react";

export { FieldDataType as DataType };

export interface Field extends FieldType {
  selected?: boolean;
}

export interface KeyValue {
  key: string;
  value: string;
}

export interface ContextValue {
  current: CurrentRef;
  state: State;
  dispatch: Dispatch<Action>;
}


