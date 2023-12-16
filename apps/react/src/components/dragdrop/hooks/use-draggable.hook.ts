import { useEffect, useRef } from 'react';
import { useDrag, useDrop, useDragLayer, DragLayerMonitor } from 'react-dnd';

interface IProps {
  type: string;
  offset?: { x?: number; y?: number } | null;
  init?: boolean;
}

const defaultProp: IProps = {
  type: 'drag',
  offset: null,
  init: true,
};

export const useDraggable = ({ type, offset, init }: IProps = defaultProp) => {
  const rElement = useRef<HTMLDivElement>(null);
  const rPreview = useRef<HTMLDivElement>(null);

  useDragLayer((monitor: DragLayerMonitor<IProps>) => {
    const isSameType = monitor.getItemType() === type;

    if (isSameType && rElement.current && rPreview.current) {
      handleSameTypeDrag(monitor);
    } else if (rElement.current && rPreview.current) {
      handleDifferentTypeDrag();
    }
  });

  const handleSameTypeDrag = (monitor: DragLayerMonitor<IProps>) => {
    const initialOffset = monitor.getInitialSourceClientOffset();
    const differenceFromInitialOffset = monitor.getDifferenceFromInitialOffset();

    if (initialOffset && differenceFromInitialOffset) {
      const { y, x } = initialOffset;
      const { y: diffY, x: diffX } = differenceFromInitialOffset;

      if (rPreview.current) {
        rPreview.current.style.setProperty('top', `${Math.round(y + diffY)}px`);
        rPreview.current.style.setProperty('left', `${Math.round(x + diffX)}px`);
      }
    }
  };

  const handleDifferentTypeDrag = () => {
    if (rPreview.current && rPreview.current.style.visibility === 'visible') {
      rPreview.current.style.setProperty('visibility', 'hidden');
    } else if (rPreview.current && rPreview.current.style.visibility === 'hidden') {
      rPreview.current.style.setProperty('visibility', 'visible');
    }
  };

  const [, drag, preview] = useDrag(() => ({
    type,
    item: { type },
  }), [type]);

  const [, drop] = useDrop(() => ({
    accept: type,
  }), [type]);

  useEffect(() => {
    if (init) {
      drag(rElement);
      drop(preview(rPreview));

      if (rPreview.current) {
        rPreview.current.style.setProperty('position', 'fixed');

        if (offset) {
          const { x, y } = offset;
          rPreview.current.style.setProperty('top', `${y}px`);
          rPreview.current.style.setProperty('left', `${x}px`);
        }
      }
    }
  }, [init, type, offset, drag, drop, preview]);

  return {
    rElement,
    rPreview,
    preview,
    drag,
    drop,
  };
};
