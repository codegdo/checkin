import { Action, ActionType, Ref, Payload, SelectTab, State } from "../types";

const initialState = {
  data: undefined,
  tab: null,
};

const initialRef = (): Ref => {
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

const editorTabs = () => {
  
}

export { initialState, initialRef, editorReducer }
