import { useAction, useFetch } from "@/hooks";
import { useEffect } from "react";

export function ButtonLogout() {
  const { updateStateOnLogoutSuccess } = useAction();
  const { isSuccess, isError, query } = useFetch('/auth/logout');

  useEffect(() => {
    if (isSuccess || isError) {
      updateStateOnLogoutSuccess();
    }
  }, [isError, isSuccess]);


  const handleLogout = () => {
    query();
  }

  return <button type="button" onClick={handleLogout}>logout</button>;
}