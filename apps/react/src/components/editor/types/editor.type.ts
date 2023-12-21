import { DataType as FieldDataType, Field as FieldType } from "@/components/types";
import { Dispatch } from "react";
import { Action } from "./action.type";
import { IEditorProps } from "../hooks";

export { FieldDataType as DataType };

export interface Field extends FieldType { }

export interface KeyValue {
  key: string;
  value: string;
}

export interface EditorTab {
  id: number | string;
  title: string;
  data: any[]
}

export interface State {
  data?: Field;
  tab: EditorTab | null;
}

export interface CurrentRef {
  onChange?: ((keyValue: KeyValue) => void);
}

export interface ContextValue {
  current: CurrentRef;
  state: State;
  dispatch: Dispatch<Action>;
  props: IEditorProps;
}