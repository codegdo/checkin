import { AnyAction } from 'redux';
import {
  LayoutState,
  UPDATE_LAYOUT,
} from './layout.type';

export function updateLayout(layouts: LayoutState): AnyAction {
  return {
    type: UPDATE_LAYOUT,
    payload: layouts,
  };
}
