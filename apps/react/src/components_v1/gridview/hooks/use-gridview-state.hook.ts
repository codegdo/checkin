import { useEffect, useReducer } from "react";
import { ActionType, Field, KeyValue } from "../types";
import { gridviewReducer } from "../reducers/gridview.reducer";

export interface GridViewProps {
  title?: string;
  className?: string;
  columns?: Field[];
  data?: KeyValue[];
  loading?: boolean;
  onClick?: (keyValue: KeyValue) => void;
  onChange?: (data: KeyValue[]) => void;
}

export const useGridViewState = ({ loading, columns = [], data = [], onClick, onChange, ...props }: GridViewProps) => {

  const [state, dispatch] = useReducer(gridviewReducer, {
    data: structuredClone(data),
    modal: null
  });

  const handleClick = (action: ActionType) => {

    dispatch({
      type: action,
      payload: {
        title: 'Add Product',
        action: 'fetchProducts'
      }
    })
  }

  const handleChange = (action: ActionType) => {

  }

  // sync state
  useEffect(() => {
    onChange && onChange(state.data);
  }, [state.data]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return {
    loading,
    source: {
      ...props,
      columns,
      data
    },
    state,
    dispatch,
    onClick: handleClick,
    onChange: handleChange
  }
}