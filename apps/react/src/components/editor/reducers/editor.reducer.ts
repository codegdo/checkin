import { Field } from "../types";

export enum ActionType {
  SELECT_TAB = 'SELECT_TAB',
}

export interface SelectTab {
  tab: string;
}

export type Payload = SelectTab;

export interface Action<T = Payload> {
  type: string | ActionType;
  payload?: T;
}

export interface State {
  dataValue: Field;
  dataSource: Field;
  tab: string | null;
}

export const editorReducer = (state: State, { type, payload }: Action<Payload>) => {
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
