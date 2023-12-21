import { Action, ActionType, CurrentRef, Payload, SelectTab, State } from "../types";

const initialState = {
  data: undefined,
  tab: null,
};

const initialRef = (): CurrentRef => {
  return {};
};

const editorReducer = (state: State, { type, payload }: Action<Payload>) => {
  switch (type) {
    case ActionType.SELECT_TAB: {
      const { tab } = payload as SelectTab;
      return {
        ...state,
        tab: tab,
      };
    }
    default:
      return state;
  }
}

export { initialState, initialRef, editorReducer }
