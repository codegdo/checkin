import React, { FC, PropsWithChildren } from 'react';
import { DndItem } from './dragdrop.type';

type DropGridProps = PropsWithChildren<DndItem>;

export const DropGrid: FC<DropGridProps> = ({ state, dispatch, dndRef, children, ...item }): JSX.Element => {

  return (
    <></>
  );
};
