import { AnyAction } from 'redux';
import { StoreState, UPDATE_STORE, DELETE_STORE } from './store.type';

const initialState: StoreState = {};

export const storeReducer = (
  state = initialState,
  action: AnyAction
): StoreState => {
  switch (action.type) {
    case UPDATE_STORE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_STORE: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
