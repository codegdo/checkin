import { useAction, useFetch } from "@/hooks";
import { useEffect } from "react";

export function ButtonLogout() {
  const { logoutSuccess } = useAction();
  const { isSuccess, isError, query } = useFetch('/auth/logout');

  useEffect(() => {
    if (isSuccess || isError) {
      logoutSuccess();
    }
  }, [isError, isSuccess]);


  const handleLogout = () => {
    query();
  }

  return <button type="button" onClick={handleLogout}>logout</button>;
}