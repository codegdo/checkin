import { useEffect, useRef } from 'react';
import { useDrag, useDrop, useDragLayer } from 'react-dnd';

interface IProps {
  type: string;
  offset?: { x?: number, y?: number } | null;
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

  useDragLayer((monitor) => {
    const initialOffset = monitor.getInitialSourceClientOffset();
    const differentOffset = monitor.getDifferenceFromInitialOffset();

    if (initialOffset && differentOffset && rPreview.current) {
      const { y, x } = initialOffset;
      const { y: diffY, x: diffX } = differentOffset;

      rPreview.current.style.top = `${Math.round(y + diffY)}px`;
      rPreview.current.style.left = `${Math.round(x + diffX)}px`;
    }
  });

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
          rPreview.current.style.setProperty('top', `${offset.y}px`);
          rPreview.current.style.setProperty('left', `${offset.x}px`);
        }
      }
    }
  }, [rElement.current, rPreview.current, offset, init]);

  return {
    rElement,
    rPreview,
    preview,
    drag,
    drop,
  };
};
