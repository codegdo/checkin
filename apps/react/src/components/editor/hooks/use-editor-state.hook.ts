import { useReducer, useRef } from 'react';
import { Field, KeyValue } from "../types";
import { initialState, initialRef, editorReducer } from '../reducers';

export interface IEditorProps {
  title?: string;
  data?: Field;
  onChange?: (keyvalue: KeyValue) => void;
}

export const useEditorState = ({ data, title = 'Editor', onChange }: IEditorProps) => {

  const ref = useRef({ ...initialRef() });
  const [state, dispatch] = useReducer(editorReducer, { ...initialState, data: structuredClone(data) });

  return {
    props: { data, title, onChange },
    current: ref.current,
    state,
    dispatch
  };
};
