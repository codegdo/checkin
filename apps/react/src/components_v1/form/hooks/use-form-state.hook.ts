import { useReducer, useRef } from "react";
import { formReducer } from "../reducers";

export const useFormState = () => {
  const ref = useRef({});
  const [state, dispatch] = useReducer(formReducer, {});
  
  return {
    ref: ref.current,
    state,
    dispatch
  }
}