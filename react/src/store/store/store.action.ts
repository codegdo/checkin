import { AnyAction } from 'redux';
import { StoreState, UPDATE_STORE, DELETE_STORE } from './store.type';

export function updateStore(newStore: StoreState): AnyAction {
  return {
    type: UPDATE_STORE,
    payload: newStore,
  };
}

export function deleteLocation(): AnyAction {
  return {
    type: DELETE_STORE,
  };
}
