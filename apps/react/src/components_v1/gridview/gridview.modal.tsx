import { useApi } from "@/hooks";
import { ContextValue } from "./contexts";
import { ActionType } from "./types";
import { useEffect } from "react";

interface IProps {
  context: ContextValue
}

export function GridViewModal({ context }: IProps) {
  const { state, onClick } = context;
  const { query } = useApi(state.modal?.action);

  const handleClose = () => {
    onClick && onClick(ActionType.CLOSE);
  }

  useEffect(() => {
    query && query();
  }, []);

  return (
    <div>
      <div>Modal</div>
      <button type="button" onClick={handleClose}>Close</button>
    </div>
  );
}