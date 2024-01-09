export enum FormActionType {}
export type FormPayload = {}
export interface FormAction {
  type: string | FormActionType;
  payload: FormPayload
}