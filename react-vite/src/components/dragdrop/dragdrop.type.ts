import { FormData, Element, DataType } from '../form';
import { DragDropContextValue } from './dragdrop.context';

export const DndItemType = { ...DataType };

export enum DndAcceptType {
  Area = 'area',
  Placeholder = 'placeholder',
  Block = 'block',
  Element = 'element',
  Field = 'field',
  Group = 'group',
  Grid = 'grid',
}

export type DndItem = Element & Partial<DragDropContextValue>;
export type DndData = FormData;
