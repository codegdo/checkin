import { useEffect, useState } from "react";

export const useFormError = () => {
  const [isError, setError] = useState(false);

  useEffect(() => {

  }, []);

  const checkValidation = () => {

  }

  return [isError, checkValidation];
}