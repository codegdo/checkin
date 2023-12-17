export interface State {
  dataSource: Record<string, any> | null;
  tab: string | null;
}

export enum ActionType {
  SELECT_TAB = 'SELECT_TAB',
}

interface SelectTab {
  tab: string;
}

export type Payload = SelectTab;

export interface Action<T = Payload> {
  type: string | ActionType;
  payload?: T;
}