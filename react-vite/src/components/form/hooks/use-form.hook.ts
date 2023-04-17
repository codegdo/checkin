import { useCallback, useEffect, useRef, useState } from "react";

import { validationHelper, ObjectSchema } from '../../../helpers';
import { Element, FormOptions } from '../form.type';
import { formHelper } from "../helpers/form.helper";

export const schema = validationHelper.objectSchema();

interface UseFormOptions {
  data?: Element[];
  options?: FormOptions
  steps?: string[] | Record<string, string[]>[];
  onCallback?: (data: string | FormValues) => void;
}

export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export const useForm = ({ data, options, onCallback }: UseFormOptions = {}) => {
  const formRef = useRef<FormValues>({});
  const errorRef = useRef<FormErrors>({});
  const validationRef = useRef({ schema });

  const [isSubmit, setIsSubmit] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<(Record<string, string[]> | string)[]>([]);
  const [direction, setDirection] = useState('');

  useEffect(() => {
    if (isSubmit) {
      const hasNoErrors = Object.keys(errorRef.current).length === 0;

      if (hasNoErrors) {
        onCallback?.(formRef.current);
      }

      setIsSubmit(false);
    }
  }, [isSubmit]);

  useEffect(() => {
    if (isReload) {
      setIsReload(false);
    }
  }, [isReload]);

  useEffect(() => {
    if (isReset) {
      formRef.current = {};
      errorRef.current = {};
      setCurrentStepIndex(0);
      setIsReset(false);
    }
  }, [isReset]);

  useEffect(() => {
    if (options?.isMultiSteps) {
      const mapKey = options?.mapKey || 'name';
      const sections = formHelper.mapFieldToSection(data, mapKey);
      setSteps(sections);
    }
  }, [data, options]);

  useEffect(() => {
    validationHelper.checkValidation(validationRef.current, formRef.current).then(errors => {
      Object.assign(errorRef.current, errors);
    });
  }, [isReset]);

  const resetForm = useCallback(() => {
    setIsReset(true);
  }, []);

  const goToPreviousStep = useCallback(() => {
    setCurrentStepIndex(index => Math.max(0, index - 1));
    setDirection('previous');
  }, []);

  const goToNextStep = useCallback(async () => {
    const array = Object.values(steps[currentStepIndex]).flat();
    const hasError = formHelper.checkErrorInArray(array, errorRef.current);

    if (hasError) {
      setIsReload(true);
      return;
    }

    setCurrentStepIndex(index => Math.min(steps.length - 1, index + 1));
    setDirection('next');
  }, [steps.length, currentStepIndex]);

  const onClick = useCallback(async (actionType: string) => {
    switch (actionType) {
      case 'submit':
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
    direction,
    isSubmit,
    isReload,
    isReset,
    steps,
    onClick,
  };
};
