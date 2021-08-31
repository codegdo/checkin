import { useEffect, useState } from "react";

export const useReset = (loading: string): boolean => {
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (loading === 'error') {
      setReset(true);
    }
  }, [loading]);

  useEffect(() => {
    return () => {
      setReset(false);
    }
  }, [reset]);

  return reset;
}