import { useEffect, useState } from "react";

export const useLoading = (status?: string): boolean => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((status === 'pending' ? true : false));
  }, [status]);

  return loading;

}