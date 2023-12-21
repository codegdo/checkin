import { DataType as FieldDataType, Field as FieldType } from "@/components/types";
import { Dispatch } from "react";
import { Action } from ".";

export { FieldDataType as DataType };

export interface Field extends FieldType {
  selected?: boolean;
}

export interface KeyValue {
  key: string;
  value: string;
}

export type DragType = 'section' | 'block' | 'button' | 'link' | 'text';

interface CallbackEvent {
  onChange?: (keyValue: KeyValue) => void;
  onClick?: (keyValue: KeyValue) => void;
}

export interface CurrentRef {
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
  dataValue: Field[];
  dataSource: Field[];

  historyData: Field[][];
  historyIndex: number;

  isEditing?: boolean;
  isSelecting?: boolean;
}

export interface ContextValue {
  current: CurrentRef;
  state: State;
  dispatch: Dispatch<Action>;
}


