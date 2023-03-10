import { FormData, Element, DataType } from '../form';
import { DragDropContextValue } from './dragdrop.context';

export const DndItemType = { ...DataType };

export enum DndActionClickType {
  MENU_EDIT = 'MENU_EDIT',
  MENU_DUPLICATE = 'MENU_DUPLICATE',
  MENU_DELETE = 'MENU_DELETE'
}

export type DndItem = Element & Partial<DragDropContextValue>;
export type DndData = FormData;
