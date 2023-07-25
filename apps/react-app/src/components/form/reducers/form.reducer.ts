interface InitialDataPayload {
  data: []
}


type ActionPayload = InitialDataPayload;

export enum FormActionType {
  INITIAL_DATA = 'INITIAL_DATA',
  MOVE_ITEM = 'MOVE_ITEM'
}

export interface FormAction<T = ActionPayload> {
  type: string | FormActionType;
  payload: T;
}