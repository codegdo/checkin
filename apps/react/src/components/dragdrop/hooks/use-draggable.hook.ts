import { useRef } from 'react';
import { useDrag, DragSourceMonitor, useDrop, useDragLayer } from 'react-dnd';

interface IProps {
  type: string;
}

export const useDraggable = ({ type }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useDragLayer((monitor) => {
    const initialSourceClientOffset = monitor.getInitialSourceClientOffset();
    const differenceFromInitialOffset = monitor.getDifferenceFromInitialOffset();

    if (initialSourceClientOffset && differenceFromInitialOffset) {
      if (previewRef.current) {
        previewRef.current.style.top = `${Math.round(initialSourceClientOffset.y + differenceFromInitialOffset.y)}px`;
        previewRef.current.style.left = `${Math.round(initialSourceClientOffset.x + differenceFromInitialOffset.x)}px`;
      }
    }
    console.log(initialSourceClientOffset, differenceFromInitialOffset);

  });

  const [, drag, preview] = useDrag(() => ({
    type,
    item: { type },
  }), [type]);

  const [, drop] = useDrop(() => ({
    accept: type,
  }), [type]);

  return {
    ref,
    previewRef,
    preview,
    drag,
    drop,
  };
};
