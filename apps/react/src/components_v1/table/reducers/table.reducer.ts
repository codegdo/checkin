import { TableAction, TableActionType, TablePayload, TableState } from "../types";

export const tableReducer = (state: TableState, action: TableAction) => {
  switch (action.type) {
    case TableActionType.UPDATE: {
      const { rowData, rowIndex } = action.payload as TablePayload;

      const updatedData = [...state.data];

      updatedData[rowIndex] = { ...updatedData[rowIndex], ...rowData }

      return { ...state, data: updatedData };
    }
    default: return state;
  }
}