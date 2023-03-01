import { FormData, Element, DataType } from '../form';

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

export type DndItem = Element;
export type DndData = FormData;