import { Action, ActionType, Payload, State } from "./types";

export const editorReducer = (state: State, { type, payload }: Action<Payload>) => {
  switch(type) {
    case ActionType.SELECT_TAB: {
      return state;
    }
    default:
      return state;
  }
}