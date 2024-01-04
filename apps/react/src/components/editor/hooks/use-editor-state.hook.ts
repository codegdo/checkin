import { useReducer, useRef } from 'react';
import { Field, KeyValue } from "../types";
import { initialState, initialRef, tabReducer, editorReducer } from '../reducers';

export interface IEditorProps {
  data?: Field;
  onChange?: (keyvalue: KeyValue) => void;
}

export const useEditorState = ({ data, onChange }: IEditorProps) => {
  const tabs = tabReducer(data?.dataType);
  const ref = useRef({ ...initialRef() });
  const [state, dispatch] = useReducer(editorReducer, {
    ...initialState,
    data: structuredClone(data || {}),
    tab: tabs[0]
  });

  return {
    props: { data, onChange },
    current: ref.current,
    tabs,
    state,
    dispatch
  };
};
