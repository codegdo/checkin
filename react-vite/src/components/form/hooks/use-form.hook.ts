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
      const hasNoErrors = Object.keys(errorRef.current).length === 0;

      if (hasNoErrors) {
        onCallback?.(formRef.current);
      }

      setIsSubmit(false);
    }
  }, [isSubmit]);

  const resetForm = useCallback(() => {
    setIsReset(true);
  }, []);

  useEffect(() => {
    if (isReset) {
      formRef.current = {};
      errorRef.current = {};
      setCurrentStepIndex(0);
      setIsReset(false);
    }
  }, [isReset]);

  const goToPreviousStep = useCallback(() => {
    setCurrentStepIndex(index => Math.max(0, index - 1));
  }, []);

  const goToNextStep = useCallback(() => {
    setCurrentStepIndex(index => Math.min(steps.length - 1, index + 1));
  }, [steps.length]);

  const onClick = useCallback(async (actionType: string) => {
    switch (actionType) {
      case 'submit':
        const initialErrors = Object.keys(errorRef.current).length === 0;

        if (initialErrors) {
          const errors = await validationHelper.checkValidation(validationRef.current, formRef.current);
          Object.assign(errorRef.current, errors);
        }

        setIsSubmit(true);
        break;
      case 'reset':
        resetForm();
        break;
      case 'previous':
        goToPreviousStep();
        break;
      case 'next':
        goToNextStep();
        break;
      default:
        onCallback?.(actionType);
    }
  }, [onCallback, resetForm, goToPreviousStep, goToNextStep]);

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
