import { DataType as FieldDataType, Field as FieldType } from "@/components/types";
import { Dispatch } from "react";
import { Action } from "./action.type";
import { IEditorProps } from "../hooks";

export { FieldDataType as DataType };

export interface Field extends FieldType {
  [key: string]: any;
}

export interface KeyValue {
  [key: string]: string;
}

export interface Tab {
  id: number | string;
  title: string;
  data: IControl[];
}

export interface IControl {
  id?: string | number;
  type: string;
  name: string;
  title: string;
  value?: string;
  data?: JSON | null;
}


export interface State {
  data?: Field;
  tab: Tab | null;
}

export interface Ref {
  onChange?: ((keyValue: KeyValue) => void);
}

export interface ContextValue {
  current: Ref;
  state: State;
  dispatch: Dispatch<Action>;
  props: IEditorProps;
  tabs: Tab[]
}