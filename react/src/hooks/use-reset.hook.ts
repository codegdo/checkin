import { useEffect, useState } from "react";

export const useReset = (loading: string): { success: boolean, error: boolean } => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (loading === 'error') {
      setError(true);
    }

    if (loading === 'success') {
      setSuccess(true);
    }

  }, [loading]);

  useEffect(() => {
    return () => {
      setError(false);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      setSuccess(false);
    }
  }, [success]);


  return { success, error };
}