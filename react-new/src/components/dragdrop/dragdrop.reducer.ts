import { DragDropAction, DragDropState } from "./dragdrop.type"

export const initialState = {
  data: []
}

export const reducer = (state: DragDropState, action: DragDropAction) => {
  switch (action.type) {
    case 'INIT':
      return { ...state, data: [...action.payload] }
    default:
      return state;
  }
}