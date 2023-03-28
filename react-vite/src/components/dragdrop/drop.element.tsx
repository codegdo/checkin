import React, { FC, PropsWithChildren } from 'react';
import { DndItem } from './dragdrop.type';

type DropElementProps = PropsWithChildren<DndItem>;

export const DropElement: FC<DropElementProps> = ({ state, dispatch, dndRef, children, ...item }): JSX.Element => {

  return (
    <></>
  );
};
