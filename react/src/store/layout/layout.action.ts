import { AnyAction } from 'redux';
import { LayoutState, LAYOUT_UPDATE } from './layout.type';

export function updateLayout(layouts: LayoutState): AnyAction {
  return {
    type: LAYOUT_UPDATE,
    payload: layouts,
  };
}
