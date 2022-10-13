export interface DragDropProps {
  data?: any;
  current?: any;
  onCallback?: (key?: string, value?: string) => void;
}

export interface DragDropContextProps extends DragDropProps {
  data: any;
  state: DragDropState;
  item: any;
  setItem: (item: any) => void;
  moveItem: (item: any) => void;
  addItem: (item: any) => void;
  deleteItem: (item: any) => void;
  duplicateItem: (item: any) => void;
  updateItem: (item: any) => void;
  onCallback: () => void;
}

export type DragDropAction = {
  type: 'INIT' | 'MOVE_ITEM' | 'ADD_ITEM' | 'DELETE_ITEM' | 'UPDATE_ITEM' | 'DUPLICATE_ITEM';
  payload?: any;
};

export type DragDropState = {
  data: any[];
};
