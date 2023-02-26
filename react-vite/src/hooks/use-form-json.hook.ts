import { useCallback, useEffect, useState } from 'react';
import { FormData } from '../components/form';
import { formHelper } from '../helpers';

const mapKey = {
  'signup.form.json': '../views/auth/signup/signup.form.json',
};

export const useFormJson = (key: keyof typeof mapKey): FormData | undefined => {
  const [form, setForm] = useState<FormData>();

  const loadFormData = useCallback(async () => {
    const path = mapKey[key];

    if (path) {
      const formData = (await import(/* @vite-ignore */ `${path.toString()}`))
        .default;

      const normalizedData = formHelper.normalize(formData);

      setForm({ ...formData, data: normalizedData });
    }
  }, [key]);

  useEffect(() => {
    loadFormData();
  }, [loadFormData]);

  return form;
};
