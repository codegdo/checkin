import { Action, ActionType, AddNewRows, State } from "../types";

export const gridviewReducer = (state: State, action: Action) => {
  switch (action.type) {
    // case ActionType.UPDATE: {
    //   const { rowValue, rowIndex } = action.payload as UpdatePayload;

    //   const updatedData = [...state.data];

    //   updatedData[rowIndex] = { ...updatedData[rowIndex], ...rowValue }

    //   return { ...state, data: updatedData };
    // }
    // case ActionType.REMOVE: {
    //   const { rowIndex } = action.payload as UpdatePayload;

    //   const updatedData = [...state.data];
    //   updatedData.splice(rowIndex, 1);

    //   return { ...state, data: updatedData };
    // }
    case ActionType.ADD_NEW_ROWS: {
      return { ...state, modal: action.payload as AddNewRows }
    }
    case ActionType.CLOSE_MODAL: {
      return { ...state, modal: null }
    }
    default: return state;
  }
}