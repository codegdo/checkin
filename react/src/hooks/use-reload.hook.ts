import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store/reducers";
import { useAction } from "./use-action.hook";
import { useFetch } from "./use-fetch.hook";

export const useReload = (): any => {
  const { session } = useSelector((state: AppState) => state);
  const { updateSession } = useAction();
  const [{ status: loading, result: { data } }, reloadSession] = useFetch(`/api/reload/session`);

  useEffect(() => {
    if (loading === 'success') {
      updateSession({ ...session, locationId: Math.floor(Math.random() * 6) + 1 });
    }
  }, [loading]);

  const reload = async () => {
    await reloadSession({ body: {} });
  }

  return [{ locationId: session.locationId }, reload];
}