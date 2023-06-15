import { useRef } from "react";

export function useDragDrop() {
  const dragRef = useRef<HTMLDivElement>(null);

  return {
    dragRef
  };
}