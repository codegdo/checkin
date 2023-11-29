import { Field } from "../../types";

export type DndField = Field;

export type SortableField = Field & {
  siblings?: string[]
}

export interface ElementInnerSize {
  innerWidth: number;
  innerHeight: number;
}

export enum MoveDirection {
  LEFT_TO_RIGHT = 'LEFT_TO_RIGHT',
  BACK_TO_LEFT = 'BACK_TO_LEFT',
  RIGHT_TO_LEFT = 'RIGHT_TO_LEFT',
  BACK_TO_RIGHT = 'BACK_TO_RIGHT',
  TOP_TO_BOTTOM = 'TOP_TO_BOTTOM',
  BACK_TO_TOP = 'BACK_TO_TOP',
  BOTTOM_TO_TOP = 'BOTTOM_TO_TOP',
  BACK_TO_BOTTOM = 'BACK_TO_BOTTOM'
}

export enum MovePosition {
  MOVE_UP = 'MOVE_UP',
  MOVE_DOWN = 'MOVE_DOWN',
  MOVE_LEFT = 'MOVE_LEFT',
  MOVE_RIGHT = 'MOVE_RIGHT'
}
