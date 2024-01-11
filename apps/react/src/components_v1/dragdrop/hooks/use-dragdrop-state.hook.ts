import { useRef } from "react";

import { DragDropReturn } from "../types";

export interface DragDropStateProps {
  status?: string;
  callback?: (returnData: DragDropReturn) => void
}

export const useDragDropState = ({ status, callback }: DragDropStateProps) => {
  const initialValues = useRef({});
  const formValues = useRef({});
  const formErrors = useRef({});

  const onCallback = (type: string) => {
    switch (type) {
      case 'submit':
        callback && callback({
          type,
          dndData: formValues.current
        });
        break;
    }
  }

  return {
    initialValues: initialValues.current,
    form: formValues.current,
    errors: formErrors.current,
    status,
    onCallback
  }
}