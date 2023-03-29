import { useCallback, useEffect, useState } from 'react';

const mapKey = {
  'signup.form.json': '../views/auth/signup/signup.form.json',
  'block.edit.json': '../components/dragdrop/jsons/block.edit.json',
  'element.edit.json': '../components/dragdrop/jsons/element.edit.json',
  'field.edit.json': '../components/dragdrop/jsons/field.edit.json'
};

export const useLoadJson = <T>(
  key?: keyof typeof mapKey,
  shouldLoad = true
): [T | undefined, (newKey?: keyof typeof mapKey) => Promise<void>] => {
  const [jsonData, setJsonData] = useState<T>();

  const loadJsonData = useCallback(async (newKey?: keyof typeof mapKey) => {
    const path = newKey ? mapKey[newKey] : key && mapKey[key];

    if (path) {
      try {
        const { default: importedJsonData } = await import(
          /* @vite-ignore */
          path.toString()
        );

        setJsonData(importedJsonData);
      } catch (error) {
        console.error(`Failed to load JSON from "${path}":`, error);
      }
    }
  }, [key]);

  useEffect(() => {
    if (shouldLoad && key) {
      loadJsonData();
    }
  }, [shouldLoad, key, loadJsonData]);

  return [jsonData, loadJsonData];
};



