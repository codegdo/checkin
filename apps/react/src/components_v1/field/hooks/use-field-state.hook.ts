import { useEffect, useState } from "react";
import { IField } from "../types";

export interface FieldProps extends IField {
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export const useFieldState = ({ onChange, onBlur, onFocus, ...props }: FieldProps) => {
  const [value, setValue] = useState(props.value as string || '');

  const handleChange = (val: string) => {
    setValue(val);
  }

  const handleBlur = () => {
    onBlur && onBlur();
  }

  const handleFocus = () => {
    onFocus && onFocus();
  }

  useEffect(() => {
    onChange && onChange(value);
  }, [value]);

  return {
    ...props,
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus
  }
}