import React, { useRef } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

export enum DataType {
  AREA = 'area',
  PLACEHOLDER = 'placeholder',
  BLOCK = 'block',
  ELEMENT = 'element',
  FIELD = 'field',
  GROUP = 'group',
  GRID = 'grid',
}

type DragDropProps = {
  id?: string;
  name?: string;
  type?: string;
  dataType: DataType | string;
  data?: unknown[];
  parentId?: string;
  placeholderId?: string;
  position?: number;
}

export const useDragDrop = ({ dataType }: DragDropProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: Object.values(DataType),
    hover: (item: any, monitor) => {
      if (!ref.current) return;

      // handle hover events here
      if (monitor.isOver({ shallow: true })) { }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }, []);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: dataType,
      item: {},
      canDrag: () => {
        //preview(getEmptyImage(), { captureDraggingState: false });
        return true;
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();

        //  handle drop events here
        if (didDrop) { }
      },
    }),
    []
  );

  return { ref, drop, drag, preview, isOver, isDragging };
}
