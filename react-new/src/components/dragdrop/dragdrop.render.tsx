import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { formHelper } from '../../helpers';
import { DragDropBlock } from './dragdrop.block';
import { DragDropContext } from './dragdrop.context';
import { DragDropField } from './dragdrop.field';
import { DragDropContextProps } from './dragdrop.type';

interface RenderProps {
  data?: any[]
}

export const Render: React.FC<PropsWithChildren<RenderProps>> = ({ data }): JSX.Element => {

  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { state, moveItem } = ctx;

  const list: any[] = (data ? data : formHelper.mapToParent(state.data)) || [];

  useEffect(() => {
    console.log(state.data)
  }, [state]);

  return <>
    {
      list.map((item, i, list) => {
        const { role } = item;
        switch (role) {
          case 'block': return <DragDropBlock key={i} index={i} list={list} {...item} />
          case 'field': return <DragDropField key={i} index={i} list={list} moveItem={moveItem} {...item} />
          default: return null;
        }
      })
    }
  </>
}