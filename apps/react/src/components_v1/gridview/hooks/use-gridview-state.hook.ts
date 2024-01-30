import { useEffect, useReducer } from "react";
import { ActionType, Field, KeyValue, ModalConfig } from "../types";
import { gridviewReducer } from "../reducers/gridview.reducer";

export interface GridViewProps {
  title?: string;
  className?: string;
  columns?: Field[];
  data?: KeyValue[];
  status?: string;
  onChange?: (data: KeyValue[]) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onClick?: (clickData: { type: string, requiredModal?: boolean }) => ModalConfig | void;
}

export const useGridViewState = ({ columns = [], data = [], status, onChange, onClick, ...props }: GridViewProps) => {

  const [state, dispatch] = useReducer(gridviewReducer, {
    data: structuredClone(data),
    modal: null
  });

  const handleClick = async (type: ActionType) => {

    switch (type) {
      case ActionType.ADD_NEW_ROWS: {
        const modal = await onClick?.({ type, requiredModal: true }) as ModalConfig;

        dispatch({
          type,
          payload: modal
        });

        break;
      }
      case ActionType.CLOSE_MODAL: {
        dispatch({ type });
        break;
      }
    }





  }

  const handleChange = (type: ActionType) => {
    console.log(type);
  }

  // sync state
  useEffect(() => {
    onChange && onChange(state.data);
  }, [state.data]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return {
    ...props,
    columns,
    data,
    status,
    state,
    dispatch,
    onChange: handleChange,
    onClick: handleClick,
  }
}