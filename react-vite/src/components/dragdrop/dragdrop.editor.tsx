import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';

import { useLoadJson, useOnClickOutside, useWrapperContext } from '../../hooks';
import { Editor, EditorTab, EditorRender } from '../editor';
import { EditorData } from '../editor/editor.component';
import { DragDropContext } from './dragdrop.context';

interface Offset {
  top: number;
  left: number;
}

const EditorMemo = React.memo(Editor);

function DragDropEditor(): JSX.Element | null {
  const editorRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<Offset>({ top: 0, left: 0 });
  const [jsonData, loadJsonData] = useLoadJson<EditorData>(undefined, false);

  const { state } = useWrapperContext(DragDropContext);
  const { item } = state || {};
  const { onChange, onClick, isEdit } = item || {};

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

  const handleClickOutside = () => console.log("clicked outside");
  useOnClickOutside(editorRef, handleClickOutside);

  const handleClick = () => {
    onClick?.();
  };

  useEffect(() => {
    if (isEdit) {
      drag(drop(dragRef));

      loadJsonData('field.editor.json');
    }
  }, [isEdit, drag, drop, loadJsonData]);

  if (!isEdit) {
    return null;
  }

  return (
    <div ref={editorRef}>
      <div ref={preview} style={{ position: "fixed", ...offset }}>
        <Editor data={jsonData}>
          <div ref={dragRef}>
            head <button type="button" onClick={handleClick}>close</button>
          </div>
          <EditorTab />
          <EditorRender />
        </Editor>
      </div>
    </div>
  );
}



export default DragDropEditor;