
import { useFetch } from "@/hooks";
import { ContextValue } from "./contexts";
import { ActionType } from "./types";
import { useEffect } from "react";

interface IProps {
  context: ContextValue
}

export function GridViewModal({ context }: IProps) {
  const { state, onClick } = context;
  const { status, data, query } = useFetch();

  const handleClose = () => {
    onClick && onClick(ActionType.CLOSE_MODAL);
  }

  useEffect(() => {
    if (state.modal && state.modal.url) {
      query({
        url: state.modal.url
      });
    }
  }, []);

  useEffect(() => {
    console.log('MODAL DATA', data);
  }, [data]);

  return (
    <div>
      <div>Modal</div>
      <button type="button" onClick={handleClose}>Close</button>
    </div>
  );
}