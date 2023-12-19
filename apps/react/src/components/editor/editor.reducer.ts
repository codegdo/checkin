import { ActionType, Field } from "./types";


interface SelectTab {
  tab: string;
}

export interface State {
  dataValue?: Field | null;
  dataSource?: Field | null;
  tab: string | null;
}

export type Payload = SelectTab;

export interface Action<T = Payload> {
  type: string | ActionType;
  payload?: T;
}

export const editorReducer = (state: State, { type }: Action<Payload>) => {
  switch (type) {
    case ActionType.SELECT_TAB: {
      return state;
    }
    default:
      return state;
  }
}