import { useState, useCallback, MouseEvent } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseDragResult {
  position: Position;
  isDragging: boolean;
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const useDrag = (): UseDragResult => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);

    const initialX = e.clientX - position.x;
    const initialY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - initialX,
          y: e.clientY - initialY,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    // Attach event listeners to the element itself
    e.currentTarget.addEventListener('mousemove', handleMouseMove);
    e.currentTarget.addEventListener('mouseup', handleMouseUp);
  }, [isDragging, position]);

  return { position, isDragging, handleMouseDown };
};

