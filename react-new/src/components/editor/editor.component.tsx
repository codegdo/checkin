import React, { CSSProperties, FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDragLayer, useDrop, XYCoord } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { EditorElement } from './edit.element';
import { EditorBlock } from './editor.block';
import { EditorField } from './editor.field';

const styles: CSSProperties = { position: 'fixed' };

export const Editor: FC<any> = ({ item, onCallback }) => {

  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ top: 0, left: 0 });

  const { isDragging, dragType, initialOffset, differentFromInitialOffset } = useDragLayer((monitor) => ({
    initialOffset: monitor.getInitialSourceClientOffset(),
    differentFromInitialOffset: monitor.getDifferenceFromInitialOffset() as XYCoord,
    dragType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
  }));

  const [_collectDrag, drag, preview] = useDrag(() => ({
    type: 'editor',
    canDrag: () => {
      preview(getEmptyImage(), { captureDraggingState: false });
      return true;
    }
  }), []);


  const [_collectDrop, drop] = useDrop(
    () => ({
      accept: ['editor']
    }), []);

  useEffect(() => {

    if (differentFromInitialOffset && initialOffset) {
      if (dragType == 'editor') {
        setOffset({
          ...offset,
          top: Math.round(initialOffset.y + differentFromInitialOffset.y),
          left: Math.round(initialOffset.x + differentFromInitialOffset.x)
        });
      }
    }

  }, [initialOffset, differentFromInitialOffset]);

  drag(drop(ref));

  const render = useCallback(() => {
    console.log('EDIT', item);
    switch (item.role) {
      case 'block':
        return <EditorBlock />
      case 'element':
        return <EditorElement />
      case 'field':
        return <EditorField {...item} />
      default: return null;
    }


  }, [item]);


  return <div ref={preview} className={(isDragging && dragType !== 'editor') ? 'editor hidden' : 'editor'} style={{ ...styles, ...offset }}>
    <div ref={ref}>
      header
    </div>
    {
      render()
    }

  </div>
}