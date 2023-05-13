import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FieldSchema, validationHelper } from "../../../helpers";
import { useWrapperContext } from "../../../hooks";
import { FormContext } from "../form.component";

interface UseFieldProps {
  fieldId?: number | string;
  fieldName: string;
  fieldLabel?: string;
  fieldValue: string;
  fieldSchema: FieldSchema
}

export const useField = ({ fieldId, fieldName, fieldLabel: label, fieldValue, fieldSchema }: UseFieldProps) => {

  const {
    form = {},
    error = {},
    options = {},
    stepIndex = 0,
    steps = [],
    validation,
    isSubmit,
    isReload,
    isReset
  } = useWrapperContext(FormContext);

  const fieldKey = (options?.mapKey === "id" && fieldId) ? `${fieldId}` : fieldName;
  const fieldLabel = label ?? fieldKey;

  const [isError, setIsError] = useState(false);
  const timerRef = useRef<number | null>(null);

  const validateField = useCallback(async () => {
    const errors = await validationHelper.checkValidation(
      validation,
      form,
      fieldKey
    );

    if (errors[fieldKey]) {
      error[fieldKey] = errors[fieldKey].replace(fieldKey, fieldLabel);
      setIsError(true);
    } else {
      delete error[fieldKey];
      setIsError(false);
    }

  }, [form, error, validation, fieldKey, fieldLabel]);

  useEffect(() => {
    form[fieldKey] = fieldValue;
    validation.schema = validation.schema.shape({ [fieldKey]: fieldSchema });

    if (isReset) {
      delete error[fieldKey];
      setIsError(false);
    }
  }, [form, error, validation, fieldSchema, fieldKey, fieldValue, isReset]);

  useEffect(() => {
    if (isSubmit) {
      validateField();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isSubmit, validateField]);

  useEffect(() => {
    if (isReload) {
      const array = Object.values(steps[stepIndex]).flat();
      if (array.indexOf(fieldKey) >= 0) {
        validateField();
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isReload, steps, stepIndex, validateField]);

  const handleChange = useCallback(
    ({ value }: { value: string }) => {
      form[fieldKey] = value;
      delete error[fieldKey];

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(validateField, 0);
    },
    [fieldKey, form, error, validateField]
  );

  return {
    fieldLabel,
    fieldValue: isReset ? fieldValue : form[fieldKey],
    errorMessage: error[fieldKey],
    isError,
    isReset,
    handleChange,
  }

}