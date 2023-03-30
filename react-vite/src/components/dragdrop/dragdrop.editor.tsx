import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';

import { useLoadJson, useOnClickOutside, useWrapperContext } from '../../hooks';
import { Editor, EditorTab, EditorContent } from '../editor';
import { DragDropContext, SelectedDndItem } from './dragdrop.context';
import { DndItem } from './dragdrop.type';
import { DataSource } from '../editor/editor.type';
import { ActionClickType } from '../../constants';

interface Offset {
  top: number;
  left: number;
}

export function DragDropEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<Offset>({ top: 0, left: 0 });
  const [dataSource, loadJsonData] = useLoadJson<DataSource>(undefined, false);

  const { state } = useWrapperContext(DragDropContext);
  const { item } = state || {};
  const { onChange: handleDataChange, onClick: handleActionClick, isEdit, ...dataObject }: SelectedDndItem = item as DndItem || {};

  const { itemType, initialSourceClientOffset, differenceFromInitialOffset } =
    useDragLayer((monitor) => ({
      initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
      differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
      itemType: monitor.getItemType(),
    }));

  const [, drag, preview] = useDrag(() => ({
    type: "panel",
    item: { type: "panel" },
  }));

  const [, drop] = useDrop(() => ({
    accept: "panel",
  }));

  useEffect(() => {
    if (itemType === "panel" && initialSourceClientOffset && differenceFromInitialOffset) {
      setOffset({
        top: Math.round(initialSourceClientOffset.y + differenceFromInitialOffset.y),
        left: Math.round(initialSourceClientOffset.x + differenceFromInitialOffset.x),
      });
    }
  }, [itemType, initialSourceClientOffset, differenceFromInitialOffset]);

  const handleClickOutside = () => {
    console.log("clicked outside");
    handleActionClick?.(ActionClickType.EDITOR_CLOSE);
  }

  useOnClickOutside(editorRef, handleClickOutside);

  const handleClick = () => {
    handleActionClick?.(ActionClickType.EDITOR_CLOSE);
  };

  useEffect(() => {
    if (isEdit && item?.dataType) {
      drag(drop(dragRef));
      switch (item?.dataType) {
        case 'block':
          loadJsonData('block.edit.json');
          break;
        case 'element':
          loadJsonData('element.edit.json');
          break;
        case 'field':
          loadJsonData('field.edit.json');
          break;
      }
    }
  }, [isEdit, item?.dataType]);

  if (!isEdit) {
    return null;
  }

  return (
    <div ref={editorRef}>
      <div ref={preview} style={{ position: "fixed", ...offset }}>
        <Editor<DndItem> dataSource={dataSource} dataObject={dataObject} onDataChange={handleDataChange} onActionClick={handleActionClick}>
          <div ref={dragRef}>
            head <button type="button" onClick={handleClick}>close</button>
          </div>
          <EditorTab />
          <EditorContent />
        </Editor>
      </div>
    </div>
  );
}
