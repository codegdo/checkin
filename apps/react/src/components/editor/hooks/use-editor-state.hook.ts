import { useReducer, useRef } from 'react';
import { Field, KeyValue } from "../types";
import { initialState, initialRef, editorReducer } from '../reducers';

interface IProps {
  data?: Field;
  onChange?: (keyvalue: KeyValue) => void;
}

export const useEditorState = ({ data, onChange }: IProps) => {

  const ref = useRef({ ...initialRef(), onChange });
  const [state, dispatch] = useReducer(editorReducer, { ...initialState, dataSource: structuredClone(data), dataValue: data });

  return {
    current: ref.current,
    state,
    dispatch
  };
};
