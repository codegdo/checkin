import { ChangeEvent } from "react";
import { FieldProps } from "./hooks";

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
}: FieldProps) {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.currentTarget.value);
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    onBlur?.();
  };

  const handleFocus = (event: ChangeEvent<HTMLInputElement>) => {
    onFocus?.();
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