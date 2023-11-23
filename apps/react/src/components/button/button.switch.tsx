import { useAction, useFetch } from "@/hooks";
import { AppState } from "@/store/reducers";
import { AccessType } from "@/store/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function ButtonSwitch() {
  const { accessType } = useSelector((state: AppState) => state.session);
  const { updateSession, updateModel } = useAction();
  const {isSuccess, query} = useFetch('/admin/clients/switch');
  const navigate = useNavigate();


  useEffect(() => {
    if (isSuccess) {
      updateSession({ clientId: null, accessType: AccessType.SYSTEM });
      updateModel({ app: {} });
      navigate('/admin/clients');
    }
  }, [isSuccess]);


  const handleSwitch = () => {
    query();
  }

  return (
    <>
      {
        accessType === AccessType.INTERNAL ? <button type="button" onClick={handleSwitch}>switch back</button> : null
      }
    </>
  );
}