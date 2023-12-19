import { Field, KeyValue } from "./types";

interface CallbackEvent {
  onChange?: (keyValue: KeyValue) => void;
  onClick?: (keyValue: KeyValue) => void;
}

export interface State {
  dataSource: Field[];
  currentData: Field[];
  historyData: Field[][];
  historyIndex: number;
  isEditing?: boolean;
  isSelecting?: boolean;
}

export interface CurrentRef {
  dropItem: Partial<Field> | null;
  selectedItem: { item?: Field, target?: Element, callback?: CallbackEvent } | null;
  elementRef: Record<string, HTMLDivElement | null>;
  coordinate: {
    x: number;
    y: number;
  };
  offset: string;
  direction: string;
  canDrop: boolean;
}

export const getInitialState = (data: Field[] = []): State => {
  return {
    dataSource: structuredClone(data),
    currentData: data,
    historyData: [],
    historyIndex: -1,
    isEditing: false,
    isSelecting: false,
  }
}

export const getCurrentRef = (): CurrentRef => {
  return {
    dropItem: null,
    elementRef: {},
    selectedItem: null,
    coordinate: { x: 0, y: 0 },
    offset: '',
    direction: '',
    canDrop: true,
  }
}