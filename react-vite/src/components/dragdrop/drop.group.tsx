import React, { FC, PropsWithChildren } from 'react';
import { DndItem } from './dragdrop.type';

type DropGroupProps = PropsWithChildren<DndItem>;

export const DropGroup: FC<DropGroupProps> = ({ state, dispatch, dndRef, children, ...item }): JSX.Element => {

  return (
    <></>
  );
};
