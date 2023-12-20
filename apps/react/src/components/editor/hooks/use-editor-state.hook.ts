import { useReducer, useRef } from 'react';
import { Field, KeyValue } from "../types";
import { editorReducer } from '../reducers';

interface IProps {
  data?: Field | object;
  onChange?: (keyvalue: KeyValue) => void;
}

export interface CurrentRef {
  onChange?: ((keyValue: KeyValue) => void);
}

const initialState = {
  dataSource: {},
  dataValue: {},
  tab: '',
};

const getInitialRef = (): CurrentRef => {
  return {
    onChange: () => console.log('change')
  };
};

export const useEditorState = ({ data, onChange }: IProps) => {

  const ref = useRef({ ...getInitialRef(), onChange });
  const [state, dispatch] = useReducer(editorReducer, { ...initialState, dataSource: structuredClone(data), dataValue: data });

  return {
    current: ref.current,
    state,
    dispatch
  };
};
