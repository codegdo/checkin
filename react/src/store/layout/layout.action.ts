import { AnyAction } from 'redux';
import {
  LayoutState,
  UPDATE_LAYOUT_EXTERNAL,
  UPDATE_LAYOUT_INTERNAL,
  UPDATE_LAYOUT_GENERAL,
  UPDATE_LAYOUT,
} from './layout.type';

export function updateExternal(layouts: LayoutState): AnyAction {
  return {
    type: UPDATE_LAYOUT_EXTERNAL,
    payload: layouts,
  };
}

export function updateInternal(layouts: LayoutState): AnyAction {
  return {
    type: UPDATE_LAYOUT_INTERNAL,
    payload: layouts,
  };
}

export function updateGeneral(layouts: { [x: string]: string }): AnyAction {
  return {
    type: UPDATE_LAYOUT_GENERAL,
    payload: layouts,
  };
}

export function updateLayout(layouts: LayoutState): AnyAction {
  return {
    type: UPDATE_LAYOUT,
    payload: layouts,
  };
}
