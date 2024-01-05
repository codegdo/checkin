import { Action, ActionType, InitialRef, Payload, SelectTab, State, UpdateValue, SetContent } from "../types";

const initialState: State = {
  data: {},
  tab: {},
  content: null,
  step: ''
};

const initialRef = (props: InitialRef): InitialRef => {
  return { ...props };
};

const editorReducer = (state: State, { type, payload }: Action<Payload>) => {
  switch (type) {
    case ActionType.SELECT_TAB: {
      const { tab } = payload as SelectTab;

      return {
        ...state, tab,
      };
    }
    case ActionType.SET_CONTENT: {
      const { content } = payload as SetContent;

      return {
        ...state, content, step: 'on-slide-in'
      };
    }
    case ActionType.CLEAR_CONTENT: {
      return {
        ...state, content: null, step: 'on-slide'
      };
    }
    case ActionType.UPDATE_VALUE: {
      const { keyvalue } = payload as UpdateValue;

      return {
        ...state,
        data: { ...state.data, ...keyvalue },
      };
    }
    default:
      return state;
  }
}

export { initialState, initialRef, editorReducer }
