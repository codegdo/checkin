import { KeyValue, Tab } from "./editor.type";

export interface SelectTab {
  tab: Tab;
}

export interface UpdateValue {
  keyvalue: KeyValue
}

export type Payload = SelectTab | UpdateValue;