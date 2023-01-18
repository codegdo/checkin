export interface DragDropProps {
  data?: any;
  current?: any;
  onCallback?: (key?: string, value?: string) => void;
}

export interface DragDropContextProps extends DragDropProps {
  state: DragDropState;
  current: any;
  dispatch?: React.Dispatch<DragDropAction>,
  onCallback?: () => void;
}

export type DragDropAction = {
  type: 'INIT' | 'MOVE_ITEM' | 'ADD_ITEM' | 'DELETE_ITEM' | 'UPDATE_ITEM' | 'DUPLICATE_ITEM' | 'SET_ITEM_EDIT' | 'SET_ITEM_ACTIVE';
  payload?: any;
};

export type DragDropState = {
  data: any[];
  item: any;
};
