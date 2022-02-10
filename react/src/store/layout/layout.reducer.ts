import { AnyAction } from 'redux';
import {
  LayoutState,
  UPDATE_LAYOUT,
} from './layout.type';

const initialState: LayoutState = {};

export const layoutReducer = (
  state = initialState,
  action: AnyAction
): LayoutState => {
  switch (action.type) {
    case UPDATE_LAYOUT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
