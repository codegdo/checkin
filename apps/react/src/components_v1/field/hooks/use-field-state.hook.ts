import { useEffect, useRef, useState } from "react";
import { IField } from "../types";

export interface FieldProps extends IField {
  error?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onClick?: (type: string) => void;
}

export const useFieldState = ({ onChange, onBlur, onFocus, onClick, ...props }: FieldProps) => {
  const [value, setValue] = useState(props.value || '');
  const hasChanged = useRef(false);

  const handleChange = (val: string) => {
    setValue(val);
    hasChanged.current = true;
  };

  const handleBlur = () => {
    onBlur && onBlur();
  };

  const handleFocus = () => {
    onFocus && onFocus();
  };

  const handleClick = (type: string) => {
    onClick && onClick(type);
  };

  useEffect(() => {
    if (hasChanged.current) {
      onChange && onChange(value as string);
    }
  }, [value]);

  return {
    ...props,
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onClick: handleClick,
  };
};