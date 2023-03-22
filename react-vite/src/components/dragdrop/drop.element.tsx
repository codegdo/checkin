import React, { PropsWithChildren } from 'react';
import { DndItem } from './dragdrop.type';

type DropElementProps = DndItem;

function DropElement({ state, dispatch, dndRef, children, ...item }: PropsWithChildren<DropElementProps>): JSX.Element {

  return (
    <></>
  );
};

export default DropElement;