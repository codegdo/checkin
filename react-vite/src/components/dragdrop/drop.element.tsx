import React, { PropsWithChildren } from 'react';
import { DndItem } from './dragdrop.type';

type DropElementProps = PropsWithChildren<DndItem>;

export function DropElement({ state, dispatch, dndRef, children, ...item }: DropElementProps) {

  return (
    <></>
  );
};
