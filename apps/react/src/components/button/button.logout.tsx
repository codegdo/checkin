import { useAction, useFetch } from "@/hooks";
import { useEffect } from "react";

export function ButtonLogout() {
  const { logoutSession } = useAction();
  const {isSuccess, isError, query} = useFetch('/auth/logout');

  useEffect(() => {
    if(isSuccess || isError) {
      logoutSession();
    }
  }, [isSuccess, isError]);

  const handleClick = () => {
    query();
  }

  return (
    <button type="button" onClick={handleClick}>logout</button>
  );
}