export interface DragDropProps {
  data?: any;
  onCallback?: (key?: string, value?: string) => void;
}

export interface DragDropContextProps extends DragDropProps {
  data: any;
  state: DragDropState;
  current?: any;
  focus: string;
  setFocus: (id: string) => void;
  moveItem: (item: any) => void;
  addItem: (item: any) => void;
  onCallback: () => void;
}

export type DragDropAction = {
  type: 'INIT' | 'MOVE_ITEM' | 'ADD_ITEM' | 'DELETE_ITEM' | 'UPDATE_ITEM';
  payload?: any;
};

export type DragDropState = {
  data: any[];
};
