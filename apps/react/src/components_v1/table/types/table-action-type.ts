export enum TableActionType {
    SUBMIT = 'submit',
    RESET = 'reset'
  }
  
  export type TablePayload = unknown;
  
  export interface TableAction {
    type: keyof typeof TableActionType;
    payload?: TablePayload;
  }