import { useAction, useFetch } from "@/hooks";
import { AppState } from "@/store/reducers";
import { AccessType } from "@/store/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function ButtonExit() {
  const { accessType } = useSelector((state: AppState) => state.session);
  const { exitClientMode } = useAction();
  const { isSuccess, isError, query } = useFetch('/admin/clients/switch');
  const navigate = useNavigate();


  useEffect(() => {
    if (isSuccess) {
      exitClientMode({
        session: { clientId: null, accessType: AccessType.SYSTEM },
      });
      navigate('/admin/clients');
    }
    if (isError) {
      console.log('error');
    }
  }, [isSuccess, isError]);


  const handleExit = () => {
    query();
  }

  return (
    <>
      {
        accessType === AccessType.INTERNAL ? <button type="button" onClick={handleExit}>Switch to admin</button> : null
      }
    </>
  );
}