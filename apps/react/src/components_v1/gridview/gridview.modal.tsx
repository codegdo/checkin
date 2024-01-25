
import { ContextValue } from "./contexts";
import { ActionType } from "./types";
import { useEffect } from "react";

interface IProps {
  context: ContextValue
}

export function GridViewModal({ context }: IProps) {
  const { state, onClick } = context;

  const handleClose = () => {
    onClick && onClick(ActionType.CLOSE);
  }

  useEffect(() => {

  }, []);

  return (
    <div>
      <div>Modal</div>
      <button type="button" onClick={handleClose}>Close</button>
    </div>
  );
}