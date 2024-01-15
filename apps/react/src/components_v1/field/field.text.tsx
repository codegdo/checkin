import { ChangeEvent } from "react";
import { IField } from "./types";

interface IProps extends IField { }

export function FieldText({
  type,
  name,
  title = '',
  placeholder = '',
  value = '',
  readonly,
  disabled,
  onChange,
  onBlur,
  onFocus
}: IProps) {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.currentTarget.value);
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    onBlur?.(event.currentTarget.value);
  };

  const handleFocus = (event: ChangeEvent<HTMLInputElement>) => {
    onFocus?.(event.currentTarget.value);
  };

  return (
    <div>
      <div>
        <label>{title}</label>
      </div>
      <div>
        <input
          type={type}
          name={name}
          value={value as string}
          placeholder={placeholder as string}
          readOnly={readonly}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>
    </div>
  );
}