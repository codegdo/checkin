import { useCallback, useEffect, useRef, useState } from "react";

import { validationHelper, ObjectSchema } from '../../../helpers';

export const schema = validationHelper.objectSchema();

interface UseFormOptions {
  steps?: string[];
  onCallback?: (data: string | FormValues) => void;
}

export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export const useForm = ({ steps = [], onCallback }: UseFormOptions = {}) => {
  const formRef = useRef<FormValues>({});
  const errorRef = useRef<FormErrors>({});
  const validationRef = useRef({ schema });

  const [isSubmit, setIsSubmit] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (isSubmit) {
      if (Object.keys(errorRef.current).length === 0) {
        onCallback?.(formRef.current);
      }
      setIsSubmit(false);
    }
  }, [isSubmit]);

  useEffect(() => {
    if (isReset) {
      setIsReset(false);
    }
  }, [isReset]);

  const onClick = useCallback(async (actionType: string) => {
    switch (actionType) {
      case 'submit':
        // validation
        const initialErrors = Object.keys(errorRef.current).length === 0;

        if (initialErrors) {
          const errors = await validationHelper.checkValidation(validationRef.current, formRef.current);
          Object.assign(errorRef.current, errors);
        }

        setIsSubmit(true);
        break;
      case 'reset':
        setIsReset(true);
        break;
      default:
        onCallback?.(actionType);
    }
  }, [onCallback]);

  const previous = () => { };

  const next = () => { };

  return {
    form: formRef.current,
    error: errorRef.current,
    validation: validationRef.current,
    currentStepIndex,
    isSubmit,
    isReset,
    onClick,
  };
};
