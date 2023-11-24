import { useAction, useFetch } from "@/hooks";
import { AppState } from "@/store/reducers";
import { AccessType } from "@/store/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function ButtonSwitch() {
  const { accessType } = useSelector((state: AppState) => state.session);
  const { updateStateOnClientSwitch } = useAction();
  const { isSuccess, isError, query } = useFetch('/admin/clients/switch');
  const navigate = useNavigate();


  useEffect(() => {
    if (isSuccess) {
      //updateSession({ clientId: null, accessType: AccessType.SYSTEM });
      //updateModel({ app: {} });
      updateStateOnClientSwitch({
        session: { clientId: null, accessType: AccessType.SYSTEM },
        model: { app: {} }
      });
      navigate('/admin/clients');
    }
    if (isError) {
      console.log('error');
    }
  }, [isSuccess, isError]);


  const handleSwitch = () => {
    query();
  }

  return (
    <>
      {
        accessType === AccessType.INTERNAL ? <button type="button" onClick={handleSwitch}>Switch to admin</button> : null
      }
    </>
  );
}