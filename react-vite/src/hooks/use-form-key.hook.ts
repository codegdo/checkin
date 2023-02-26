import { useEffect, useState } from 'react';

export const useFormKey = (
  keyName: string | undefined,
  id: string,
  name: string
): string => {
  const [key, setKey] = useState<string>(
    keyName && id && keyName === 'id' ? id : name
  );

  useEffect(() => {
    if (keyName) {
      const newKey = keyName && id && keyName === 'id' ? id : name;
      setKey(newKey);
    }
  }, [keyName]);

  return key;
};
