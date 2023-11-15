import { useAction, useFetch } from "@/hooks";
import { useEffect } from "react";

export const useLoginApi = () => {
  const { updateUser } = useAction();
  const { status, isSuccess, data, mutation } = useFetch<any>('/auth/login');

  useEffect(() => {
    if (isSuccess) {
      updateUser(data);
      
    }
  }, [isSuccess]);

  return { status, data, mutation };
}