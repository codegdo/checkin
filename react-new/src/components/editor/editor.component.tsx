import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
//import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useDrag, useDragLayer, useDrop, XYCoord } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { EditorContent } from './editor.content';
import { EditorSetting } from './editor.setting';
import { EditorStyle } from './editor.style';

const style: CSSProperties = { position: 'fixed' };

export const Editor: FC<any> = ({ name, data, onChange, onClick }) => {

  const ref = useRef<HTMLDivElement>(null);
  //const [parent] = useAutoAnimate({ duration: 500 });
  const [offset, setOffset] = useState({ top: 0, left: 0 });
  const [tab, setTab] = useState<string>('');

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

  const handleTabClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setTab(event.target.name);
  }

  drag(drop(ref));

  return <div ref={preview} className={(isDragging && dragType !== 'editor') ? 'editor hidden' : 'editor'} style={{ ...style, ...offset }}>
    <header className='editor-header' ref={ref}>
      {!tab && name}
      {tab && <button name='' type='button' onClick={handleTabClick}>back</button>}
    </header>
    <div>
      {
        !tab && <nav className='editor-tab'>
          {Object.keys(data).map((key) => {
            return <div key={key}><button className={(tab == key) ? 'active' : ''} name={key} type='button' onClick={handleTabClick}>{key}</button></div>
          })}
        </nav>
      }
      {
        tab && <main className='editor-main'>
          {Object.keys(data).map((key, i) => {
            switch (key) {
              case 'content':
                return (tab == key) && <EditorContent key={key} data={data[key]} onChange={onChange} />;
              case 'style':
                return (tab == key) && <EditorStyle key={key} />;
              case 'setting':
                return (tab == key) && <EditorSetting key={key} />;
              default:
                return <></>
            }
          })}
        </main>
      }
    </div>
    <footer className='editor-footer'>
      <button name='cancel' type='button' onClick={onClick}>Cancel</button>
    </footer>
  </div>
}