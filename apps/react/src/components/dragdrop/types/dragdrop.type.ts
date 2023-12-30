import { DataType as FieldDataType, Field as FieldType } from "@/components/types";
import { Dispatch } from "react";
import { Action } from "./action.type";
import { IDragDropProps } from "../hooks";
import { Descendant } from "slate";

export { FieldDataType as DataType };

export type Field = FieldType;

export interface KeyValue {
  [key: string]: string | Descendant[];
}

export type DragType = 'section' | 'block' | 'button' | 'link' | 'text';

interface CallbackEvent {
  onChange?: (keyValue: KeyValue) => void;
  onClick?: (keyValue: KeyValue) => void;
}

export interface Ref {
  dropItem: Partial<Field> | null;
  selectedItem: { item?: Field, target?: Element, callback?: CallbackEvent } | null;
  elementRef: Record<string, HTMLDivElement | null>;
  dragging: {
    coordinate: {
      x: number;
      y: number;
    };
    offset: string;
    direction: string;

  };
  canDrop: boolean;
}

export interface State {
  data: Field[];

  historyData: Field[][];
  historyIndex: number;

  isEditing?: boolean;
  isSelecting?: boolean;
  isUndoing?: boolean;
}

export interface ContextValue {
  current: Ref;
  state: State;
  dispatch: Dispatch<Action>;
  props: IDragDropProps
}

export type TextData = Descendant;
