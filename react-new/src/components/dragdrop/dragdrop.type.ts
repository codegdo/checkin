export interface DragDropProps {
  data?: any;
  onCallback?: (key?: string, value?: string) => void;
}

export interface DragDropContextProps extends DragDropProps {
  data?: any;
  state: DragDropState;
  current?: any;
  moveItem: () => void;
  onCallback: () => void;
}

export type DragDropAction = {
  type: 'INIT' | 'MOVE_ITEM' | 'REMOVE_ITEM';
  payload?: any;
};

export type DragDropState = {
  data?: any[];
};
