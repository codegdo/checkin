import React, { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { util, validationHelper } from '../../helpers';

import { useWrapperContext } from '../../hooks';
import { Label, Input, KeyValue } from '../input';
import { FormContext } from './form.component';
import { useField } from './hooks/use-field.hook';

export interface FieldProps {
  id?: string | number;
  name: string;
  type: string;
  label?: string;
  description?: string;
  note?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  defaultValue?: string;
  isRequired?: boolean;
}

export function FormField({
  id,
  type,
  name,
  label,
  description,
  value,
  defaultValue = "",
  isRequired,
}: FieldProps) {

  const fieldSchema = useMemo(
    () => validationHelper.fieldSchema({ type, isRequired }),
    [type, isRequired]
  );

  const { fieldLabel, fieldValue, errorMessage, isError, isReset, handleChange } = useField({
    fieldId: id,
    fieldName: name,
    fieldLabel: label,
    fieldValue: value ?? defaultValue,
    fieldSchema
  });

  const classNames = util.classNames({
    'is-error': isError,
  });

  return (
    <div className={classNames}>
      <Label label={fieldLabel} description={description} />
      <Input
        type={type}
        name={name}
        value={fieldValue}
        isReset={isReset}
        onChange={handleChange}
      />
      {isError && <span>{errorMessage}</span>}
    </div>
  );
}

