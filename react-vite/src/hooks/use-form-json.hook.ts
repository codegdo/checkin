import { useEffect, useState } from 'react';
import { FormData } from '../components/form';

const MAP: { [key: string]: string } = {
  'signup.form.json': '../views/auth/signup/signup.form.json'
}

export const useFormJson = (path: string): FormData | undefined => {
  const [form, setForm] = useState<FormData | undefined>();

  useEffect(() => {
    void (async () => {
      const mapPath = MAP[path];

      if (mapPath) {
        const formData = (await import(/* @vite-ignore */ `${mapPath.toString()}`)).default;


        setForm(formData);
      }

    })();
  }, []);

  return form;
}