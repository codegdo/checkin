import React, { PropsWithChildren } from 'react';
import { DndItem } from './dragdrop.type';

type DropGroupProps = PropsWithChildren<DndItem>;

export function DropGroup({ state, dispatch, dndRef, children, ...item }: DropGroupProps) {

  return (
    <></>
  );
};
