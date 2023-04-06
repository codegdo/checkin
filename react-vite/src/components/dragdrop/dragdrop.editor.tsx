import React, { JSXElementConstructor, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';

import { useLoadJson, useOnClickOutside, useWrapperContext } from '../../hooks';
import { Editor, EditorTab, EditorContent, EditorHeader, EditorFooter } from '../editor';
import { DragDropContext, SelectedDndItem } from './dragdrop.context';
import { DndItem } from './dragdrop.type';
import { DataSource } from '../editor/editor.type';
import { ActionClickType } from '../../constants';
import { KeyValue } from '../input';
import { util } from '../../helpers';
import { dndHelper } from './helpers/dragdrop.helper';

interface Offset {
  top: number;
  left: number;
}

export function DragDropEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const { current: offsetRef } = useRef({ top: 0, left: 0 });
  const [dataSource, loadJsonData] = useLoadJson<DataSource>(undefined, false);

  const { state } = useWrapperContext(DragDropContext);
  const { item } = state || {};
  const { itemRef, isEdit, onChange, onClick, ...dataObject }: SelectedDndItem = item as DndItem || {};

  const { itemType, offset } =
    useDragLayer((monitor) => {
      const itemType = monitor.getItemType();
      const offset = { top: 0, left: 0 };
      const initialSourceClientOffset = monitor.getInitialSourceClientOffset();
      const differenceFromInitialOffset = monitor.getDifferenceFromInitialOffset();

      if (initialSourceClientOffset && differenceFromInitialOffset) {
        offset.top = Math.round(initialSourceClientOffset.y + differenceFromInitialOffset.y);
        offset.left = Math.round(initialSourceClientOffset.x + differenceFromInitialOffset.x);
      }

      return { itemType, offset }
    });

  const [, drag] = useDrag(() => ({
    type: "panel",
    item: { type: "panel" },
  }));

  const [, drop] = useDrop(() => ({
    accept: "panel",
  }));

  useEffect(() => {
    if (itemType === "panel") {
      //const previewTarget = preview(previewRef) as unknown as React.RefObject<HTMLDivElement>;

      if (editorRef.current) {
        editorRef.current.style.top = `${offset.top}px`;
        editorRef.current.style.left = `${offset.left}px`;

        offsetRef.top = offset.top;
        offsetRef.left = offset.left;
      }

    }
  }, [itemType, offset]);

  const handleClickOutside = () => {
    onClick?.(ActionClickType.EDITOR_SAVE);
  }

  useOnClickOutside(editorRef, handleClickOutside);

  const handleChange = (keyValue: KeyValue) => {
    onChange?.(keyValue);
  }

  const handleClick = (actionType: string) => {
    //alert(actionType);
    onClick?.(actionType);
  };

  useEffect(() => {
    if (isEdit && item?.dataType) {
      // const target = itemRef?.current;
      // const itemOffset = { top: 0, left: 0 };

      // if (target) {
      //   const rect = target.getBoundingClientRect();
      //   itemOffset.top = rect.top;
      //   itemOffset.left = rect.left;
      // }

      // const editorDimension = { width: 203, height: 288 }

      const position = dndHelper.calculateEditorPosition(itemRef, editorRef);

      if (editorRef.current) {
        editorRef.current.style.top = `${position.y}px`;
        editorRef.current.style.left = `${position.x}px`;
      }

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
    <div ref={editorRef} style={{ position: 'fixed' }}>
      <Editor<DndItem> title={item?.dataType} dataSource={dataSource} dataObject={dataObject} onChange={handleChange} onClick={handleClick}>
        <EditorHeader ref={dragRef} />
        <EditorTab />
        <EditorContent />
        <EditorFooter />
      </Editor>
    </div>
  );
}

//display: 'inline-flex', transform: `translate(${offset.left}px, ${offset.top}px)`