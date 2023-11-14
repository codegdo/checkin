import { AppStatus } from "@/constants";
import { useAction, useFetch } from "@/hooks";
import { useEffect } from "react";

export const useLoginApi = () => {
  const { updateUser, updateStatus } = useAction();
  const { status, isSuccess, data, mutation } = useFetch<any>('/auth/login');

  useEffect(() => {
    if (isSuccess) {
      updateUser(data);
      updateStatus({ isLoggedIn: true, current: AppStatus.ACTIVE });
    }
  }, [isSuccess]);

  return { status, data, mutation };
}