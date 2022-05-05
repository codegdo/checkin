import { AnyAction } from 'redux';
import { LayoutState, LAYOUT_UPDATE } from './layout.type';

export const initialLayoutState: LayoutState = {};

export const layoutReducer = (
  state = initialLayoutState,
  action: AnyAction
): LayoutState => {
  switch (action.type) {
    case LAYOUT_UPDATE: {
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
