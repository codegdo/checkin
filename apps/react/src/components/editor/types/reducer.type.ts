import { IControl, KeyValue, Tab } from "./editor.type";

export interface SelectTab {
  tab: Tab;
}

export interface SetContent {
  content: IControl | null;
}

export interface UpdateValue {
  keyvalue: KeyValue
}

export type Payload = SelectTab | SetContent | UpdateValue;