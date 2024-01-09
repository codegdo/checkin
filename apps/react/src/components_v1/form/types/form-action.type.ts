export enum FormActionType {
  SUBMIT = 'submit',
  RESET = 'reset'
}

export type FormPayload = unknown;

export interface FormAction {
  type: string | FormActionType;
  payload?: FormPayload;
}