import { useAction, useFetch } from "@/hooks";
import { AppState } from "@/store/reducers";
import { AccessType } from "@/store/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function ButtonLogout() {
  const { accessType } = useSelector((state: AppState) => state.session);
  const { logoutSession, updateSession, updateModel } = useAction();
  const apiLogout = useFetch('/auth/logout');
  const apiSwitch = useFetch('/admin/switch');
  const navigate = useNavigate();

  useEffect(() => {
    if (apiLogout.isSuccess || apiLogout.isError) {
      logoutSession();
    }
  }, [apiLogout.isError, apiLogout.isSuccess, logoutSession]);

  useEffect(() => {
    if (apiSwitch.isSuccess) {
      updateSession({ clientId: null, accessType: AccessType.SYSTEM });
      updateModel({ app: {} });
      navigate('/');
    }
  }, [apiSwitch.isSuccess, navigate, updateModel, updateSession]);

  const handleLogout = () => {
    apiLogout.query();
  }

  const handleSwitch = () => {
    apiSwitch.query()
  }

  return (
    <span>
      {
        accessType === AccessType.INTERNAL && <button type="button" onClick={handleSwitch}>switch back</button>
      }
      <button type="button" onClick={handleLogout}>logout</button>
    </span>
  );
}