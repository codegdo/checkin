import { useReducer, useRef } from 'react';
import { Field, KeyValue } from "../types";
import { initialState, initialRef, tabReducer, editorReducer } from '../reducers';

export interface IEditorProps {
  data?: Field;
  onChange?: (keyvalue: KeyValue) => void;
  options?: {
    offset: { x: number, y: number };
    isDraggable: boolean;
  }
}

export const useEditorState = ({ data, onChange }: IEditorProps) => {
  const tabs = tabReducer(data?.dataType);
  const ref = useRef({ ...initialRef({ data, onChange }) });
  const [state, dispatch] = useReducer(editorReducer, {
    ...initialState,
    data: structuredClone(data || {}),
    tab: tabs[0]
  });

  return {
    current: ref.current,
    tabs,
    state,
    dispatch,
  };
};
