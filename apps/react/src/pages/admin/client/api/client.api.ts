import { useEffect } from "react";
import { useAction, useFetch } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { AccessType } from "@/store/types";

interface Account {
  accountId: string;
  companyId: number;
  companyName: string;
}

interface ClientLogin {
  account: {
    id: string;
    companyId: number;
    isActive: boolean;
  };
  model: {
    app: Record<string, unknown>
  }
}

export const useGetAllClients = (params?: Record<string, string | number>) => {
  const api = useFetch<Account[]>('/admin/clients', { ...params });

  useEffect(() => {
    api.query();
  }, []);

  return { ...api }
}

export const useGetClientSwitch = () => {
  const { enterClientMode } = useAction();
  //const { state: history } = useLocation();
  const navigate = useNavigate();
  const { status: fetchStatus, isSuccess, data, query } = useFetch<ClientLogin>();

  useEffect(() => {
    const handleLoginSuccess = () => {
      if (isSuccess && data) {
        const { account, model } = data;
        enterClientMode({
          session: { clientId: account.companyId, accessType: AccessType.INTERNAL },
          model: { app: model.app }
        });
        navigate('/');
      }
    };

    handleLoginSuccess();
  }, [data, isSuccess]);

  return { status: fetchStatus, data, query };
}