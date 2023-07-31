import { useCallback, useRef } from "react";

interface UseFormParams {
  onCallback?: (name: string) => void;
}

export function useForm({ onCallback }: UseFormParams) {
  const formRef = useRef({});
  const errorRef = useRef({});
  const eventRef = useRef({});

  const handleClick = useCallback((name: string) => {
    console.log(name);
    onCallback && onCallback('click');
  }, [onCallback]);

  return {
    values: formRef.current,
    errors: errorRef.current,
    events: eventRef.current,
    handleClick
  }
}