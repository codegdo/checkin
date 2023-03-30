import { FormData, Element, DataType } from '../form';
import { DragDropContextValue } from './dragdrop.context';

export enum DndActionType {
  SET_SELECTED_ITEM = 'SET_SELECTED_ITEM',
  SET_SELECTED_ITEM_EDIT = 'SET_SELECTED_ITEM_EDIT',
  SET_SELECTED_ITEM_NULL = 'SET_SELECTED_ITEM_NULL',
  SET_INITIAL_ITEMS = 'SET_INITIAL_ITEMS',
  ADD_ITEM = 'ADD_ITEM',
  MOVE_ITEM = 'MOVE_ITEM',
  CLONE_ITEM = 'CLONE_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  UPDATE_ITEM = 'UPDATE_ITEM',
  RESET_ITEM = 'UPDATE_RESET',
}

export const DndItemType = { ...DataType };
export type DndItem = Element & Partial<DragDropContextValue>;
export type DndData = FormData;
