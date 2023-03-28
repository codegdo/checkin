import React, { PropsWithChildren } from 'react';
import { DndItem } from './dragdrop.type';

type DropGridProps = PropsWithChildren<DndItem>;

export function DropGrid({ state, dispatch, dndRef, children, ...item }: DropGridProps) {

  return (
    <></>
  );
};
