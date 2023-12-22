import { useReducer, useRef } from 'react';
import { Field, KeyValue } from "../types";
import { initialState, initialRef, editorReducer } from '../reducers';

export interface IEditorProps {
  data?: Field;
  onChange?: (keyvalue: KeyValue) => void;
}

export const useEditorState = ({ data, onChange }: IEditorProps) => {

  const ref = useRef({ ...initialRef() });
  const [state, dispatch] = useReducer(editorReducer, { ...initialState, data: structuredClone(data) });

  return {
    props: { data, onChange },
    current: ref.current,
    tabs: [],
    state,
    dispatch
  };
};
